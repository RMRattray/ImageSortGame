'use client';
import { NimGame, AI_type } from "@/lib/nim";
import { useReducer } from 'react';
import { clsx } from "clsx";

interface GameRunner {
    game_started: boolean,
    game_over: boolean,
    ai_type: AI_type;
    last_player_loses: boolean;
    player_starts: boolean;
    player_wins: boolean;
    player_turn: boolean;
    total: number;
    taken: number;
    nimGameCopy: NimGame|null;
}

interface GameAction {
    type: string,
    val?: number | boolean
    prop?: string
}

export default function Page() {
    const [gameRunner, affectGame] = useReducer((state: GameRunner, action: GameAction) => {
        switch (action.type) {
            case "start_game":
                return {...state, ...{
                    game_started: true, player_turn: state.player_starts,
                    nimGameCopy: new NimGame(state.total, state.ai_type, state.player_starts, state.last_player_loses)
                }}
            case "player_move":
                state.nimGameCopy?.player_move(action.val as number)
                return {...state, ...state.nimGameCopy}
            case "ai_move":
                state.nimGameCopy?.ai_move();
                return {...state, ...state.nimGameCopy}
            default:
                break;
        }
        return state;
    },
    {
        game_started: false,
        game_over: false,
        ai_type: AI_type.Random,
        last_player_loses: true, 
        player_starts: true,
        player_wins: true,
        player_turn: false,
        total: 18,
        taken: 0,
        nimGameCopy: null
    }
    )

    return(
        <div>
            <div className={clsx({"hidden": gameRunner.game_started})}>
                <h1>Game not started</h1>
                <button onClick={() => { affectGame({ type: "start_game" })}}>Start game</button>
            </div>
            <div className={clsx({"hidden": !gameRunner.game_started})}>
                <h1>Game has been started, yahoo</h1>
                <h2>{gameRunner.taken}</h2>
                <button onClick={() => { affectGame({type: "player_move", val: 2})}}>Take two</button>
            </div>
        </div>
    )
}
'use client';
import { NimGame, AI_type } from "@/lib/nim";
import { useReducer } from 'react';
import { clsx } from "clsx";

interface GameRunner {
    game_started: boolean,
    game_over: boolean
}

interface GameAction {
    type: string,
    val?: number | boolean
}

export default function Page() {
    const [gameRunner, affectGame] = useReducer((state: GameRunner, action: GameAction) => {
        switch (action.type) {
            case "start_game":
                return {...state, ...{"game_started": true}}
                break;
            default:
                break;
        }
        return state;
    },
    { "game_started": false, "game_over": false}
    )

    return(
        <div>
            <div className={clsx({"hidden": gameRunner.game_started})}>
                <h1>Game not started</h1>
                <button onClick={() => { affectGame({ type: "start_game" })}}>Start game</button>
            </div>
            <div className={clsx({"hidden": !gameRunner.game_started})}>
                <h1>Game has been started, yahoo</h1>
            </div>
        </div>
    )
}
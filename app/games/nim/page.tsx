'use client';
import { NimGame, AI_type } from "@/lib/nim";
import DivMenu from "@/components/divmenu";
import { useReducer } from 'react';
import { clsx } from "clsx";
import { NimDisplay, NimButtons } from "@/components/nim_display";
import Link from "next/link";

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
    takeable: number;
    taking: number;
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
            case "set_ai_type":
                return {...state, ...{ ai_type: action.val as AI_type } }
            case "set_quantity":
                return {...state, ...{ total: action.val as number } }
            case "set_starter":
                return {...state, ...{ player_starts: action.val as boolean } }
            case "set_winner":
                return {...state, ...{ last_player_loses: action.val as boolean } }
            case "settings":
                return {...state, ...{ game_started: false} }
            case "start_game":
                return {...state, ...{
                    game_started: true, player_turn: state.player_starts, taken: 0, game_over: false,
                    nimGameCopy: new NimGame(state.total, state.ai_type, state.player_starts, state.last_player_loses)
                }}
            case "set_takeable":
                return {...state, ...{takeable: action.val as number}};
            case "player_move":
                state.nimGameCopy?.player_move(action.val as number)
                if (state.nimGameCopy && !(state.nimGameCopy.game_over)) setTimeout( () => { affectGame({type: "start_ai_move"}); }, 500);
                return {...state, ...state.nimGameCopy, ...{takeable: 0, player_turn: false}}
            case "start_ai_move":
                state.nimGameCopy?.ai_move();
                setTimeout( () => { affectGame({type: "ai_move"}); }, 500);
                return {...state, ...{taking: (state.nimGameCopy ? state.nimGameCopy.taken : state.taken) - state.taken}}
            case "ai_move":
                return {...state, ...state.nimGameCopy, ...{taking: 0, player_turn: true}}
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
        takeable: 0,
        taking: 0,
        nimGameCopy: null
    }
    )

    return(
        <main className="flex min-h-screen flex-col items-center p-8">
            <div className="w-3/4">
            <div className={clsx({"hidden": gameRunner.game_started})}>
                <h1 className="text-3xl">Game settings</h1>
                <DivMenu token={"set_ai_type"} property={"ai_type"} prop_er_name={"Select an opponent"} state_access={gameRunner} dispatch_access={affectGame} options={
                    [{display:"Clueless guesser", value:AI_type.Random}, {display:"Typical amateur", value:AI_type.StepAhead}, {display:"Perfect player", value:AI_type.Perfect}]
                }/>
                <DivMenu token={"set_starter"} property={"player_starts"} prop_er_name={"Select rules:"} state_access={gameRunner} dispatch_access={affectGame} options={
                    [{display:"Human goes first", value:true}, {display:"AI goes first", value:false}]
                }/>
                <DivMenu token={"set_winner"} property={"last_player_loses"} prop_er_name={""} state_access={gameRunner} dispatch_access={affectGame} options={
                    [{display:"Last player wins", value:false}, {display:"Last player loses", value:true}]
                }/>
                <DivMenu token={"set_quantity"} property={"total"} prop_er_name={"Choose how many matches"} state_access={gameRunner} dispatch_access={affectGame} options={
                    Array.from(Array(9).keys()).map( (val) => { val = val + 12; return {display: val as unknown as string, value: val}; })
                }/>
                <div className="flex justify-center">
                    <button className="text-2xl" onClick={() => { affectGame({ type: "start_game" })}}>Start game</button>
                </div>
            </div>
            <div className={clsx({"hidden": !gameRunner.game_started})}>
                <div className="w-full flex flex-row place-items-center">
                    <h1 className="flex-grow text-center text-3xl">{gameRunner.game_over ? "Game over.  " + (gameRunner.player_wins ? "You win!" : "AI wins") : gameRunner.player_turn ? "Your turn" : "AI turn" }</h1>
                    <div className={clsx("space-x-2", {"hidden": !gameRunner.game_over})}>
                        <button className="bg-green-500 p-2 rounded-full" onClick={() => {affectGame({ type: "start_game" })}}>Start over</button>
                        <button className="bg-green-500 p-2 rounded-full" onClick={() => {affectGame({ type: "settings" })}}>Game settings</button>
                        <Link href="../"><button className="bg-green-500 p-2 rounded-full">Back to gallery</button></Link>
                    </div>
                </div>
                <NimDisplay total={gameRunner.total} takeable={gameRunner.takeable} taken={gameRunner.taken} taking={gameRunner.taking}/>
                <NimButtons dispatch_access={affectGame} player_turn={gameRunner.player_turn}/>
            </div>
            </div>
        </main>
    )
}
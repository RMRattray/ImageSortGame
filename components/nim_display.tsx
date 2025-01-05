import clsx from "clsx";

export function NimDisplay({ total, taken, takeable, taking }:
    { total: number, taken: number, takeable: number, taking: number}) {

    return(<div className="w-full flex flex-row">
        {Array.from(Array(total).keys()).map( (val) => { val = val + 1; return(
            <div key={"match_"+val} className={clsx("h-6 flex-grow m-2", {
                "bg-green-500": val > taken + takeable + taking,
                "bg-yellow-500": taken < val && val <= taken + takeable,
                "bg-orange-500": taken < val && val <= taken + taking,
                "bg-gray-500": val <= taken
            })}>
            </div>
        )})}
    </div>)
}

export function NimButtons({ dispatch_access, player_turn } : { dispatch_access: Function, player_turn: boolean}) {
    return (
        <div className="w-full flex flex-row">
            {[1, 2, 3].map( (val) => { return(<button className="flex-grow h-12 p-4 m-2" key={"pb_" + val} 
                onClick={() => {if (player_turn) dispatch_access({type: "player_move", val: val})}}
                onMouseEnter={() => {if (player_turn) dispatch_access({type: "set_takeable", val: val})}}
                onMouseLeave={() => {if (player_turn) dispatch_access({type: "set_takeable", val: 0})}}
            >{val}</button>)})}
        </div>
    )
}
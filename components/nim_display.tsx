import clsx from "clsx";

export function NimDisplay({ total, taken, takeable, taking }:
    { total: number, taken: number, takeable: number, taking: number}) {

    return(<div className="w-full flex flex-row">
        {Array.from(Array(total).keys()).map( (val) => { val = val + 1; return(
            <div key={"match_"+val} className={clsx("h-6 flex-grow m-2 rounded-sm", {
                "bg-green-500": val > taken + takeable + taking,
                "bg-yellow-500": taken < val && val <= taken + takeable,
                "bg-orange-500": taken < val && val <= taken + taking,
                "bg-gray-500": val <= taken
            })}>
            </div>
        )})}
    </div>)
}

export function NiminDisplay({ total, taken, takeable, taking, values }:
    { total: number, taken: number, takeable: number, taking: number, values: Array<number>}) {

    return(<div className="w-full flex flex-row">
        {values.map( (val, ind) => { ind = ind + 1; return(
            <div key={"match_"+ind} className={clsx("p-2 flex-grow m-2 rounded-sm text-3xl text-center", {
                "bg-green-500": ind > taken + takeable + taking,
                "bg-yellow-500": taken < ind && ind <= taken + takeable,
                "bg-orange-500": taken < ind && ind <= taken + taking,
                "bg-gray-500": ind <= taken
            })}>{val}
            </div>
        )})}
    </div>)
}

export function NimButtons({ dispatch_access, player_turn } : { dispatch_access: Function, player_turn: boolean}) {
    return (
        <div className="w-full flex flex-row">
            {[1, 2, 3].map( (val) => { return(<button className="flex-grow h-12 p-4 m-2 bg-gray-800 rounded-lg" key={"pb_" + val} 
                onClick={() => {if (player_turn) dispatch_access({type: "player_move", val: val})}}
                onMouseEnter={() => {if (player_turn) dispatch_access({type: "set_takeable", val: val})}}
                onMouseLeave={() => {if (player_turn) dispatch_access({type: "set_takeable", val: 0})}}
            >{val}</button>)})}
        </div>
    )
}


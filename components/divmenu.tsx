import clsx from "clsx";
import { AI_type } from "@/lib/nim";

interface Option {
    display: string;
    value: number | boolean | AI_type
}

export default function DivMenu( { token, property, prop_er_name, options, state_access, dispatch_access} :
    { token: string, property: string, prop_er_name: string, options: Array<Option>, state_access: any, dispatch_access: Function } ) {
    return (
    <div className="w-full flex flex-row p-5 m-2">
        <h2>{prop_er_name}</h2>
        {options.map( (option) => { return(
            <button className={clsx("flex-grow m-5 p-10",
                    {"bg-green-500" : state_access[property] == option.value, "bg-gray-500" : state_access[property] != option.value})}
                onClick={() => {
                    dispatch_access({type: token, val: option.value})
                }}
            >{option.display}</button>
        )})}
    </div>)
}
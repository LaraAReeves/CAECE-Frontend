import { IAula } from "../lib/IAula";

export default function Aula ({...rest}){
    return(
        <div className="box-border aula h-32 w-32 p-4 border-4 -rotate-90" {...rest}></div>
    )
}
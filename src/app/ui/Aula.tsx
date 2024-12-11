import { IAula } from "../lib/IAula";
import clsx from 'clsx';


export default function Aula ({className, children, aula,  ...rest}: {className?: string, aula:IAula, children?: React.ReactNode}){
    return(
        <div className={clsx("box-border aula h-32 w-32 p-4 border-4 -rotate-90" , className)} {...rest}>{children}</div>
    )
}
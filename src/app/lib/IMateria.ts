import { IHorario } from "./IHorario";

export interface IMateria{
    id:number, 
    nombre: string,
    profesor:string,
    horarios:IHorario[];
}
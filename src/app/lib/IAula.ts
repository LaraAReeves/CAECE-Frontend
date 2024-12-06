import { IMateria } from "./IMateria";

export interface IAula {
    id: number, 
    nombre: string, 
    piso: number, 
    edificio: string,
    materias:IMateria[];
}
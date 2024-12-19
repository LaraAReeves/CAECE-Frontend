import { IAula } from "./IAula"
import { IMateria } from "./IMateria";
const aulas:IAula[] =  [
    { id: 1, nombre: 'P11', piso: 1, edificio: 'A', materias:[  
        {
            id:2, 
            nombre: "Calculo I",
            profesor:"Juan Gomez",
            horarios:[{
                "diaSemana": "Miercoles",
                "horaInicio":"18:30",
                "horaFin":"22:30"
            }]
        },
        {
            id:4, 
            nombre: "Matematica discreta",
            profesor:"Juan Perez",
            horarios:[{
                "diaSemana": "Miercoles",
                "horaInicio":"8:00",
                "horaFin":"12:00"
            }]
        }
    ]},
    { id: 2, nombre: 'P12', piso: 1, edificio: 'A',materias:[ ]}, 
    { id: 4, nombre: 'P13', piso: 1, edificio: 'A',materias:[]}, 
    { id: 6, nombre: 'P14', piso: 1, edificio: 'A', materias:[] },
    { id: 8, nombre: 'P31', piso: 3, edificio: 'A', materias:[] }, 
    { id: 3, nombre: 'P41', piso: 4, edificio: 'A', materias:[] }, 
    { id: 5, nombre: 'P22', piso: 2, edificio: 'A', materias:[
        {
            id:1, 
            nombre: "Matematica discreta",
            profesor:"Juan Perez",
            horarios:[{
                "diaSemana": "Martes",
                "horaInicio":"8:00",
                "horaFin":"12:00"
            }]
        }
    ] }, 
    { id: 7, nombre: 'P71', piso: 7, edificio: 'A', materias:[] } 
  ];

const materias = ["Matematica discreta","Calculo I"];
const data ={
    get:(query?:string, piso?:number, dia?:string):Promise<IAula[]> => {
        let resultado:IAula[];
        if(query){
            resultado = aulas.map(aula => ({...aula,
                materias: aula.materias
                    .filter(materia =>
                        (!query || materia.nombre.toLowerCase().includes(query.toLowerCase())) && 
                        (!dia || materia.horarios.some(horario => horario.diaSemana === dia))
                    )
            }));
        }
        else{
            resultado = aulas.map(aula => ({
                ...aula,
                materias: aula.materias.map(materia => ({
                    ...materia,
                    horarios: materia.horarios.filter(horario => horario.diaSemana === dia)
                })).filter(materia => materia.horarios.length > 0) // Filtra materias sin horarios válidos
            }));
        }
        return new Promise((resolve) => setTimeout(() => resolve(resultado),0));
    },
    buscarMateria:(busqueda:string): Promise<string[]> => {
        return new Promise((resolve) => setTimeout(() => resolve(materias.filter((materia)=>{ return materia.toLowerCase().includes(busqueda.toLowerCase())})),0));
    }
}
export default data;
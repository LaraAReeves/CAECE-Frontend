import { IAula } from "./IAula"
import { IMateria } from "./IMateria";
const aulas:IAula[] =  [
    { id: 1, nombre: 'P11', piso: 1, edificio: 'H', materias:[  
        {
            id:2, 
            nombre: "Calculo I",
            profesor:"Juan Gomez",
            horarios:[{
                "diaSemana": "Jueves",
                "horaInicio":"18:30",
                "horaFin":"22:30"
            }]
        },
        {
            id:4, 
            nombre: "Matematica discreta",
            profesor:"Alfredo Perez",
            horarios:[{
                "diaSemana": "Viernes",
                "horaInicio":"8:00",
                "horaFin":"12:00"
            }]
        }
    ]},
    { id: 9, nombre: 'P11', piso: 1, edificio: 'P', materias:[] },
    { id: 2, nombre: 'P12', piso: 1, edificio: 'P',materias:[ ]}, 
    { id: 4, nombre: 'P13', piso: 1, edificio: 'P',materias:[]}, 
    { id: 6, nombre: 'P14', piso: 1, edificio: 'P', materias:[] },
    { id: 7, nombre: 'P15', piso: 1, edificio: 'P', materias:[] },
    { id: 8, nombre: 'P31', piso: 3, edificio: 'P', materias:[] }, 
    { id: 3, nombre: 'P41', piso: 4, edificio: 'P', materias:[] }, 
    { id: 5, nombre: 'P22', piso: 2, edificio: 'H', materias:[
        {
            id:1, 
            nombre: "Matematica discreta",
            profesor:"Juan Perez",
            horarios:[{
                "diaSemana": "Sabado",
                "horaInicio":"8:00",
                "horaFin":"12:00"
            }]
        }
    ] }, 
    { id: 10, nombre: 'P12', piso: 1, edificio: 'H', materias:[] },
    { id: 11, nombre: 'P13', piso: 1, edificio: 'H', materias:[] },
    { id: 12, nombre: 'P14', piso: 1, edificio: 'H', materias:[] } 


  ];

const materias: IMateria[] = [
    { id: 1, nombre: "Matematica discreta", profesor: "Juan Perez", horarios: [] },
    { id: 2, nombre: "Calculo I", profesor: "Juan Gomez", horarios: [] }
];
const data ={
    get:(query?:string, profesor?:string, dia?:string):Promise<IAula[]> => {
        let resultado:IAula[];
        if(query){
            resultado = aulas.map(aula => ({...aula,
                materias: aula.materias
                    .filter(materia =>
                        (!query || materia.nombre.toLowerCase().includes(query.toLowerCase())) && 
                        (!dia || materia.horarios.some(horario => horario.diaSemana === dia)) &&
                        (!profesor || materia.profesor.toLowerCase().includes(profesor.toLowerCase()) )
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
    buscarMateria:(busqueda:string): Promise<IMateria[]> => {
        return new Promise((resolve) => setTimeout(() => resolve(materias.filter((materia)=>{ return materia.nombre.toLowerCase().includes(busqueda.toLowerCase()) || materia.profesor.toLowerCase().includes(busqueda.toLowerCase())})),0));
    }
}
export default data;
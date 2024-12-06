import { IAula } from "./IAula"
const aulas:IAula[] =  [
    { id: 1, nombre: 'P11', piso: 1, edificio: 'A', materias:[  {id:2, 
        nombre: "matematica discreta",
        profesor:"pepito",
        horarios:[]}]},
    { id: 2, nombre: 'P12', piso: 1, edificio: 'A',materias:[]}, 
    { id: 4, nombre: 'P13', piso: 1, edificio: 'A',materias:[]}, 
    { id: 6, nombre: 'P14', piso: 1, edificio: 'A', materias:[] },
    { id: 8, nombre: 'P31', piso: 3, edificio: 'A', materias:[] }, 
    { id: 3, nombre: 'P41', piso: 4, edificio: 'A', materias:[] }, 
    { id: 5, nombre: 'P22', piso: 2, edificio: 'A', materias:[] }, 
    { id: 7, nombre: 'P71', piso: 7, edificio: 'A', materias:[] } 
  ];

const data ={
    get:(query?:string, piso?:number):Promise<IAula[]> => {
        let resultado = aulas;
        if(query){
            console.log(query);
            resultado = resultado.filter((aula)=>{ // filtramos aulas que contengan el nombre de esa materia
                console.log("aulas segun busqueda ", aula.materias.filter((materia) => materia.nombre.toLowerCase().includes(query.toLowerCase())));
                if(aula.materias.filter((materia) => materia.nombre.toLowerCase().includes(query.toLowerCase()) ).length > 0){
                    return aula;
                }
            });
        }
        else{
            resultado = resultado.filter((aula)=> {
                return aula.piso == piso;
            });
        }
        
        return new Promise((resolve) => setTimeout(() => resolve(resultado),0));
    }
}
export default data;
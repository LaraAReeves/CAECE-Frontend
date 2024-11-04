'use client';
import Search from "../ui/search";
import {BotonPiso} from "../ui/botonPiso";
import { useState } from "react";
import { IAula } from "../lib/IAula";
import * as React from 'react'
import Aula from "../ui/Aula";
export default function Mapa({searchParams}: { searchParams?: { query?: string}}){
    let cantPisos = 7;
    // no me deja hacer eso
    // const query = searchParams?.query || '';
    // console.log(query);
    const aulasTotales = [
        { id: 1, nombre: 'Aula 101', detalle: 'Departamento de IT', piso: 1, profesor: 'Juan Perez', edificio: 'A' },
        { id: 2, nombre: 'Aula 102', detalle: 'Recursos Humanos', piso: 1, profesor: 'Juan Perez', edificio: 'A' }, 
        { id: 3, nombre: 'Aula 201', detalle: 'Recursos Humanos', piso: 4, profesor: 'Juan Perez', edificio: 'A' }, 
        { id: 4, nombre: 'Aula 102', detalle: 'Recursos Humanos', piso: 1, profesor: 'Juan Perez', edificio: 'A' }, 
        { id: 5, nombre: 'Aula 201', detalle: 'Recursos Humanos', piso: 2, profesor: 'Juan Perez', edificio: 'A' }, 
        { id: 6, nombre: 'Aula 102', detalle: 'Recursos Humanos', piso: 1, profesor: 'Juan Perez', edificio: 'A' },
        { id: 7, nombre: 'Aula 201', detalle: 'Recursos Humanos', piso: 7, profesor: 'Juan Perez', edificio: 'A' } 
      ]
    const [pisoActual, setPisoActual] = useState(1);
    const [aulas, setAulas] = useState<IAula[]>(aulasTotales.filter(aula => aula.piso === 1));

    const [aulaSeleccionada, setAulaSeleccionada] = useState<IAula | null>(null);
    function cambiarPiso(idPiso:number){
        setPisoActual(idPiso);
        setAulas(aulasTotales.filter(aula => aula.piso === idPiso));
        //aca se debería llamar a la api con el id del piso
    }
    return(
        <>
        <Search placeholder="Materia" />
        <div className="flex flex-row justify-between w-screen px-5">
            <div className="flex flex-row justify-between w-screen px-5 mt-10">
            {aulas.map((aula) => (
                <Aula aula={aula} key={aula.id} onClick={() => setAulaSeleccionada(aula)}>{aula.nombre}</Aula>
            ))}
            </div>
            <div className="flex flex-col gap-10 justify-center text-center mt-10">
                {Array.from({ length: cantPisos }, (_, i) => (
                    <BotonPiso key={i + 1} onClick={() => cambiarPiso(i + 1)} className={pisoActual == (i + 1) ? 'bg-foreground text-white' : 'bg-slate-300 text-black'}>{i + 1}</BotonPiso>
                ))}
            </div>
        </div>
        {aulaSeleccionada && (
            <div className='detalle m-6 p-6'>
            <h3>{aulaSeleccionada.nombre}</h3>
            <p>{aulaSeleccionada.detalle}</p>
            <p>{aulaSeleccionada.piso}</p>
            <p>{aulaSeleccionada.profesor}</p>
          </div>
      )}
        </>
    )

}

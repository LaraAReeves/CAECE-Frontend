'use client';
import Search from "../ui/search";
import {BotonPiso} from "../ui/botonPiso";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IAula } from "../lib/IAula";
import * as React from 'react'
import Aula from "../ui/Aula";
import ModalAula from "../ui/modalAula";
export default function Mapa(){
    let cantPisos = 7;
    // las aulas se deberian obtener a partir de un servicio que acceda al endpoint en el back
    const aulasTotales = [
        { id: 1, nombre: 'Aula 101', detalle: 'Departamento de IT', piso: 1, profesor: 'Juan Perez', edificio: 'A' },
        { id: 2, nombre: 'Aula 102', detalle: 'Recursos Humanos', piso: 1, profesor: 'Juan Perez', edificio: 'A' }, 
        { id: 4, nombre: 'Aula 103', detalle: 'Recursos Humanos', piso: 1, profesor: 'Juan Perez', edificio: 'A' }, 
        { id: 6, nombre: 'Aula 104', detalle: 'Recursos Humanos', piso: 1, profesor: 'Juan Perez', edificio: 'A' },
        { id: 8, nombre: 'Aula 301', detalle: 'Recursos Humanos', piso: 3, profesor: 'Juan Perez', edificio: 'A' }, 
        { id: 3, nombre: 'Aula 401', detalle: 'Recursos Humanos', piso: 4, profesor: 'Juan Perez', edificio: 'A' }, 
        { id: 5, nombre: 'Aula 202', detalle: 'Recursos Humanos', piso: 2, profesor: 'Juan Perez', edificio: 'A' }, 
        { id: 7, nombre: 'Aula 701', detalle: 'Recursos Humanos', piso: 7, profesor: 'Juan Perez', edificio: 'A' } 
      ]
    const [pisoActual, setPisoActual] = useState(1);
    const [aulas, setAulas] = useState<IAula[]>(aulasTotales.filter(aula => aula.piso === 1));
    const [modalAbierto, setModalAbierto] = useState(false);
    const [aulaSeleccionada, setAulaSeleccionada] = useState<IAula | null>(null);
    const searchParams = useSearchParams();
    
    useEffect(() => {
        const busqueda = searchParams.get('query');
        if (busqueda) {
            const aulaEncontrada = aulasTotales.find(aula => aula.nombre.includes(busqueda));
            if (aulaEncontrada) {
                setAulaSeleccionada(aulaEncontrada);
                setPisoActual(aulaEncontrada?.piso || 0);
                setAulas(aulasTotales.filter(aula => aula.piso === aulaEncontrada.piso))
            }
        }
        else{
            setAulaSeleccionada(null);
        }
    }, [searchParams]);
    
    
    function cambiarPiso(idPiso:number){
        setPisoActual(idPiso);
        setAulas(aulasTotales.filter(aula => aula.piso === idPiso));
        //aca se debería llamar a la api con el id del piso
    }

    function handleClickAula(aula:IAula){
        setAulaSeleccionada(aula);
        setModalAbierto(true);
    }

    return(
        <>
        <Search placeholder="Materia" />
        <div className="flex flex-row justify-between w-screen px-5">
            <div className="flex flex-row justify-between w-screen px-5 mt-10">
            {aulas.map((aula) => (
                <Aula aula={aula} key={aula.id} onClick={() => handleClickAula(aula)} className={ aulaSeleccionada?.nombre == aula.nombre ? "border-foreground" : "box-border"}>{aula.nombre}</Aula>
            ))}
            </div>
            <div className="flex flex-col gap-10 justify-center text-center mt-10">
                {Array.from({ length: cantPisos }, (_, i) => (
                    <BotonPiso key={i + 1} onClick={() => cambiarPiso(i + 1)} className={pisoActual == (i + 1) ? 'bg-foreground text-white' : 'bg-slate-300 text-black'}>{i + 1}</BotonPiso>
                ))}
            </div>
        </div>
        {aulaSeleccionada && (
            <ModalAula aula={aulaSeleccionada} abierto={modalAbierto}></ModalAula>
        //     <div className='detalle m-6 p-6'>
        //     <h3>{aulaSeleccionada.nombre}</h3>
        //     <p>{aulaSeleccionada.detalle}</p>
        //     <p>{aulaSeleccionada.piso}</p>
        //     <p>{aulaSeleccionada.profesor}</p>
        //   </div>
      )}
        </>
    )

}

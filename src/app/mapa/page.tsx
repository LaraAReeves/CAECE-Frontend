'use client';
import Search from "../ui/search";
import {BotonPiso} from "../ui/botonPiso";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IAula } from "../lib/IAula";
import Image from "next/image";
import ascensor from "../public/ascensor.png";
import * as React from 'react'
import Aula from "../ui/Aula";
import data from "../lib/data";
import Filtro from "../ui/filtroDiaSemana";
import { IMateria } from "../lib/IMateria";
import ModalAula from "../ui/modalAula";

export default function Mapa(){
    const cantPisos = 7;
    const searchParams = useSearchParams();
    const [aulas, setAulas] = useState<IAula[]>([]);
    const [pisoActual, setPisoActual] = useState(1);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [aulaSeleccionada, setAulaSeleccionada] = useState<IAula | null>(null);
    const [edificio, setEdificio] = useState<string>("P");
    const [materias, setMaterias] = useState<IMateria[]>([]);
    const pathname = usePathname();
    const { replace } = useRouter();
   
    
    useEffect(() => {//problema cuando se deja de buscar y se quiere ver normal
      const busquedaMateria = searchParams.get('materia');
      const busquedaProfesor = searchParams.get('profesor');
      const dia = searchParams.get('dia');
      if(busquedaMateria){
        data.buscarMateria(busquedaMateria).then((datos)=> { 
          setMaterias(datos);
        });
      }
      else{
        setAulaSeleccionada(null);
        setMaterias([]);
      }
      data.get(busquedaMateria!,busquedaProfesor!, dia!).then((datos)=> { 
        if(datos.length > 0){
          setAulas(datos.filter((aula)=> aula.piso == pisoActual && aula.edificio == edificio));
          let aula:IAula = datos.find((aula) => aula.materias.find((materia) => materia.nombre == busquedaMateria && materia.profesor == busquedaProfesor))!;
          if(aula){
            setAulaSeleccionada(aula);
            setPisoActual(aula.piso);
            setEdificio(aula.edificio);
          }
        }
      });
    }, [searchParams, pisoActual, edificio]);
    
    function buscarPorMateria(nombreMateria:string, profesor:string){
      const params = new URLSearchParams(searchParams);
      params.set('materia',nombreMateria);
      params.set('profesor',profesor);
      replace(`${pathname}?${params.toString()}`);  
    }
    
    function cambiarPiso(idPiso:number){
      setPisoActual(idPiso);
    }

    function cambiarEdificio(edificio:string){
      setEdificio(edificio);
      const params = new URLSearchParams();
      // params.set('query',nombreMateria);
      replace(`${pathname}?${params.toString()}`);     
      console.log(edificio);
    }

    function handleClickAula(aula:IAula){
        setAulaSeleccionada(aula);
        setModalAbierto(true);
    }

    return(
        <>
        <div className="w-[100%] p-4 flex flex-col md:flex-row items-baseline justify-start gap-5 ">
          <div className="flex-col md:w-[50%] w-[100%] relative">
            <Search placeholder="Materia o profesor"/>
            {
              searchParams.get('materia') && (
                <div className="border-b-2 border-foreground absolute w-[100%] z-10 p-5 bg-white">
                  {materias.length == 0 && (
                    <p>No hay resultados</p>
                  )}
                 {materias.map((materia, index) => ( <p onClick={() => {buscarPorMateria(materia.nombre, materia.profesor)}} key={index}>{materia.nombre}  -  {materia.profesor}</p>))}
                </div>
              )}
              </div>
            <Filtro></Filtro>
            <div className="flex flex-row gap-0 bg-foreground text-white">
              <button onClick={() => cambiarEdificio('P')} className={"p-2 " + (edificio == 'P' ? 'bg-foreground text-white' : 'bg-slate-300 text-black')}>P</button>
              <button onClick={() => cambiarEdificio('H')} className={"p-2 " + (edificio == 'H' ? 'bg-foreground text-white' : 'bg-slate-300 text-black')} >H</button>
            </div>
            
        </div>
        <div className="flex flex-row justify-between w-screen px-5 m-auto">
          { edificio == 'P' && (
            <>
            <div className="flex items-center text-right text-xs -rotate-90">
              Av. de Mayo
            </div>
            <div className="px-5 mt-10 gap-2 contenedorAulas w-[100%]">
              {aulas.map((aula) => (
                <Aula aula={aula} indice={aulas.indexOf(aula)} key={aula.id} onClick={() => handleClickAula(aula)} className={aulaSeleccionada?.nombre == aula.nombre ? "border-foreground" : "box-border"}><p>{aula.nombre}</p></Aula>
              ))}
              <Image src={ascensor} alt={""} width={50}/>
              <Image src={ascensor} alt={""} width={50}/>

            </div></>
          )
          }
          {edificio == "H" && (
            <><div className="px-5 mt-10 gap-2 contenedorAulas w-[100%]">
              {aulas.map((aula) => (
                <Aula aula={aula} indice={aulas.indexOf(aula)} key={aula.id} onClick={() => handleClickAula(aula)} className={aulaSeleccionada?.nombre == aula.nombre ? "border-foreground" : "box-border"}><p>{aula.nombre}</p></Aula>
              ))}
            </div></>
          )}
          <div className="flex flex-col gap-10 justify-center text-center mt-10 mb-10">
                {Array.from({ length: cantPisos }, (_, i) => (
                  <BotonPiso key={i + 1} onClick={() => cambiarPiso(i + 1)} className={pisoActual == (i + 1) ? 'bg-foreground text-white' : 'bg-slate-300 text-black'}>{i + 1}</BotonPiso>
                ))}
              </div>
          </div>
        {aulaSeleccionada && (
          <ModalAula aulaSeleccionada={aulaSeleccionada} open={modalAbierto} onClose={setModalAbierto}></ModalAula>
      )}
        </>
    )
}

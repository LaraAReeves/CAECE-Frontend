'use client';
import Search from "../ui/search";
import {BotonPiso} from "../ui/botonPiso";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

import { useEffect, useState } from "react";
import { IAula } from "../lib/IAula";

import * as React from 'react'
import Aula from "../ui/Aula";
import ModalAula from "../ui/modalAula";
import data from "../lib/data";

export default function Mapa(){
    let cantPisos = 7;
    const [aulas, setAulas] = useState<IAula[]>([]);
    const [pisoActual, setPisoActual] = useState(1);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [aulaSeleccionada, setAulaSeleccionada] = useState<IAula | null>(null);

    const searchParams = useSearchParams();
    
    useEffect(() => {
        const busqueda = searchParams.get('query');
        data.get(busqueda!, pisoActual || 1).then((datos)=> { 
            if(datos.length > 0){
                setAulas(datos);
                setPisoActual(datos[0].piso)
            } 
            else{
                console.log("no hay datos");
            }
    });
    }, [searchParams, pisoActual]);
    
    
    function cambiarPiso(idPiso:number){
        setPisoActual(idPiso);
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
            <Dialog open={modalAbierto} onClose={setModalAbierto} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
      
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                        {/* <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" /> */}
                        {aulaSeleccionada.nombre}

                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                            {aulaSeleccionada.nombre}
                        </DialogTitle>
                        <div className="mt-2">
                            {aulaSeleccionada.materias.map((materia) =>(
                                  <>
                                  <p key={materia.id} className="text-sm text-gray-500">{materia.nombre}</p>
                                  <p key={materia.profesor} className="text-sm text-gray-500">{materia.profesor}</p>
                                  {materia.horarios.map((horario)=>(
                                    <>
                                    <p className="text-sm text-gray-500">
                                        {horario.diaSemana} de {horario.horaInicio} a {horario.horaFin}
                                    </p>
                                    </>
                                  ))}
                                  </>
                            ))};
                          <p className="text-sm text-gray-500">
                            Piso: {aulaSeleccionada.piso}
                          </p>
                          <p className="text-sm text-gray-500">
                            Edificio: {aulaSeleccionada.edificio}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={() => setModalAbierto(false)}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Cerrar
                    </button> */}
                    {/* <button
                      type="button"
                      data-autofocus
                      onClick={() => setOpen(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button> */}
                  {/* </div> */}
                </DialogPanel>
              </div>
            </div>
          </Dialog>
            // <ModalAula aula={aulaSeleccionada} abierto={modalAbierto}></ModalAula>
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

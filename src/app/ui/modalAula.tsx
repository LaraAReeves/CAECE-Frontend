import { IAula } from "../lib/IAula";
'use client'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

export default function ModalAula({aulaSeleccionada, ...rest }: { aulaSeleccionada: IAula}) {
  return (
    <Dialog className="relative z-10" {...rest}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 items-center">
          <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-foreground text-white sm:mx-0 sm:size-12">
                  {/* <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" /> */}
                  {aulaSeleccionada.nombre}
                </div>
                <div className="mt-3 text-left sm:ml-4 sm:mt-0 sm:text-left">
                  {/* <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    {aulaSeleccionada.nombre}
                  </DialogTitle> */}
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Piso: {aulaSeleccionada.piso}
                    </p>
                    <p className="text-sm text-gray-500">
                      Edificio: {aulaSeleccionada.edificio}
                    </p>
                    <div className="mt-2">
                    {aulaSeleccionada.materias.map((materia) =>(
                      <div key={materia.id} className="mt-2">
                        <p className="text-sm text-gray-500 font-semibold">{materia.nombre}</p>
                        <p className="text-sm text-gray-500"> Profesor/a: {materia.profesor}</p>
                        {materia.horarios.map((horario)=>(
                          <div key={horario.horaInicio}>
                            <p className="text-sm text-gray-500">
                                {horario.diaSemana} de {horario.horaInicio} a {horario.horaFin}
                            </p>
                          </div>  
                        ))}
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog> 
  )
}
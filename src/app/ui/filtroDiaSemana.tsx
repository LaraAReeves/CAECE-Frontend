import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

export default function Filtro() {
    const opciones = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    let d = new Date(); 
    const [diaElegido, setDiaElegido] = useState(opciones[d.getUTCDay()-1] || "Lunes");
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    useEffect(() => {
      console.log("searchParams", diaElegido);
        const params = new URLSearchParams(searchParams);
        params.set('dia', diaElegido);
        replace(`${pathname}?${params.toString()}`);
    }, [searchParams]);

    function filtrar(opcion: string) {
        setDiaElegido(opcion);
        const params = new URLSearchParams(searchParams);
        console.log("opcion", opcion);
        if (opcion) {
          params.set('dia', opcion);
        } else {
          params.delete('dia');
        }
        replace(`${pathname}?${params.toString()}`);
    }

  return (
    <select value={diaElegido} className="p-2" onChange={(event) => {filtrar(event.target.value)}} > // para que no tome la primera opcion
        {/* <option> Filtrar por día </option> */}
        {opciones.map((opcion) => (
            <option key={opcion}> {opcion} </option>
        ))}
    </select>
           

  )
}


'use client';
import Image from 'next/image';
import logo from '../public/logo.png';
import Link from 'next/link';
import React, { useState } from 'react';
import {EyeFilledIcon} from "../ui/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../ui/EyeSlashFilledIcon";

export default function Page(){
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return(
        <div className='flex flex-col justify-center items-center bg-white md:w-1/3 md:h-4/6 rounded-xl gap-7 w-[100%] h-[100%]'>
            <Image src={logo} alt="logo" width={250} className=''/>
            <p className='text-3xl font-semibold'>Registrate</p>
            <form className='flex flex-col gap-3 md:w-[70%] w-[80%]'>
                <div className='border-2 border-foreground rounded-full p-3 flex gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <input type="text" id="nombreUsuario" name="nombreUsuario" placeholder='Nombre completo' className='focus:outline-none' />
                </div>
                <div className='border-2 border-foreground rounded-full p-3 flex gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <input type="text" id="email" name="email" placeholder='Email' className='focus:outline-none'/>
                </div>
                <div className='border-2 border-foreground rounded-full p-3 flex gap-2 items-center relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>

                    <input id="password" name="clave" placeholder='Contraseña' className='focus:outline-none' type={isVisible ? "text" : "password"}/>
                    {
                    <button className="focus:outline-none absolute right-3" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />

                    ) : (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />

                    )}
                    </button>
      }
                </div>
            </form>
            <button type="submit" className='bg-foreground text-background px-8 py-4 rounded-2xl mx-auto font-semibold'>Registrate</button>
            <p className='mx-auto my-5'>Ya tenés una cuenta? <Link href='/login' className='ml-auto underline font-bold'>Iniciá Sesión</Link> </p>
        </div>

    )
}
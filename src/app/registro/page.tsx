'use client';
import Image from 'next/image';
import logo from '../public/logo.png';
import Link from 'next/link';
import React, { useActionState, useState } from 'react';
import {EyeFilledIcon} from "../ui/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../ui/EyeSlashFilledIcon";
import { MailIcon } from '../ui/MailIcon';
import { UsernameIcon } from '../ui/UsernameIcon';
import { PasswordIcon } from '../ui/PasswordIcon';
import { login, register, State } from '../lib/actions';

export default function Page(){
    const [isVisible, setIsVisible] = useState(false);
    const estadoInicial: State = { message: null, errors: {}, fields: {email:'', clave:'', nombreUsuario:''} };
    const [state, formAction] = useActionState(register,estadoInicial);
    const toggleVisibility = () => setIsVisible(!isVisible);
    
    return(
        <div className='flex flex-col justify-center items-center bg-white md:w-1/3 md:h-4/6 rounded-xl gap-7 md w-[100%] h-[100%]'>
            <Image src={logo} alt="logo" width={250} className=''/>
            <p className='text-3xl font-semibold'>Registrate</p>
            <form className='flex flex-col gap-3 md:w-[70%] w-[80%]' action={formAction}>
                <div className='border-2 border-foreground rounded-full p-3 flex gap-2 items-center'>
                    <UsernameIcon className="size-6" />
                    <input type="text" id="nombreUsuario" name="nombreUsuario" placeholder='Nombre completo' className='focus:outline-none' defaultValue={state.fields?.nombreCompleto} />
                </div>
                {state.errors?.nombreUsuario &&
                    state.errors.nombreUsuario.map((error: string) => (
                    <p className=" text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))}
                <div className='border-2 border-foreground rounded-full p-3 flex gap-2 items-center'>
                    <MailIcon className="size-6" />
                    <input type="text" id="email" name="email" placeholder='Email' className='focus:outline-none' defaultValue={state.fields?.email}/>
                </div>
                {state.errors?.email &&
                    state.errors.email.map((error: string) => (
                    <p className=" text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))}
                <div className='border-2 border-foreground rounded-full p-3 flex gap-2 items-center relative'>
                    <PasswordIcon className="size-6" />
                    <input id="password" name="clave" placeholder='Contraseña' className='focus:outline-none' type={isVisible ? "text" : "password"} defaultValue={state.fields?.clave}/>
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
                {state.errors?.clave &&
                    state.errors.clave.map((error: string) => (
                    <p className=" text-sm text-red-500" key={error}>{error}</p>
                ))}
                <button type="submit" className='bg-foreground text-background px-8 py-4 rounded-2xl mx-auto font-semibold'>Registrate</button>
            </form>
            <p className='mx-auto my-5'>Ya tenés una cuenta? <Link href='/login' className='ml-auto underline font-bold'>Iniciá Sesión</Link> </p>
        </div>
    )
}
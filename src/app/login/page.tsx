'use client';
import Image from 'next/image';
import logo from '../public/logo.png';
import Link from 'next/link';
import {EyeFilledIcon} from "../ui/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../ui/EyeSlashFilledIcon";
import { useState } from 'react';
import { MailIcon } from '../ui/MailIcon';
import { PasswordIcon } from '../ui/PasswordIcon';

export default function Page(){
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return(
        <div className='flex flex-col justify-center items-center bg-white lg:w-1/3 lg:h-4/6 md:w-1/2 md:h-2/3 rounded-xl md:gap-3 gap-7 w-[100%] h-[100%]'>
            <Image src={logo} alt="logo" width={250} className=''/>
            <p className='text-3xl font-semibold'>Iniciá Sesión</p>
            <form className='flex flex-col gap-3 md:w-[70%] w-[80%]'>
                <div className='border-2 border-foreground rounded-full p-3 flex gap-2 items-center'>
                    <MailIcon className="size-6" />
                    <input type="text" id="email" name="email" placeholder='Email' className='focus:outline-none'/>
                </div>
                <div className='border-2 border-foreground rounded-full p-3 flex gap-2 items-center relative'>
                    <PasswordIcon className="size-6" />

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
                <Link href='/registro' className='ml-auto underline'>Olvidé mi contraseña</Link>
                </form>
            <button type="submit" className='bg-foreground text-background px-8 py-4 rounded-2xl mx-auto font-semibold'>Iniciar sesión</button>
            <p className='mx-auto my-5'>¿No tenés cuenta? <Link href='/registro' className='ml-auto underline font-bold'>Registrate</Link> </p>
        </div>

    )
}

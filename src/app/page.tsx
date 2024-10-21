import Image from "next/image";
import logo from "./public/logo-ucaece-blanco.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-[100%] h-[60%] flex items-center justify-center flex-col p-6 gap-7">
      <Image src={logo} alt="logo" width={500} />
      <div className="flex flex-col items-center justify-center gap-6 w-80 h-2/4 bg-gray-400/60 p-5">
        <button className="bg-foreground text-white p-6 px-10 rounded-3xl font-semibold"><Link href="/login">Inicia Sesión</Link></button> 
        <button className="text-foreground bg-white p-6 px-10 rounded-3xl font-semibold"><Link href="/registro">Registrate</Link></button>
      </div>
      <p className="text-white font-semibold mt-auto">¡Informate sobre tus materias, aultas y profesores!</p>
    </div>
  );
}

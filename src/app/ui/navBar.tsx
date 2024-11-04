import Image from "next/image";
import logo from "../public/logo-ucaece-blanco.png";
import Link from "next/link";
export default function SideNav() {
    return(
        <header className="bg-foreground w-screen h-20 flex justify-between items-center px-5 text-white">
            <Image src={logo} alt="logo" width={150} />
            <Link href="/">Cerrar sesión</Link>
        </header>
    )

}
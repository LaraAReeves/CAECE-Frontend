import {z} from 'zod';
export const loginSchema = z.object({
    email: z.string().email('Ingrese un email válido'),
    clave: z.string().min(1, 'Ingrese una contraseña'),
    //clave: z.string({message: 'Ingrese una contraseña'})
});
export const registerSchema = z.object({
    email: z.string().email('Ingrese un email válido'),
    clave: z.string().min(1, 'Ingrese una contraseña'),
    nombreUsuario: z.string().min(1, 'Ingrese un nombre completo')
    //clave: z.string({message: 'Ingrese una contraseña'})
})
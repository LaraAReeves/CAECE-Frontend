'use server';
import { redirect } from 'next/navigation';
import { loginSchema } from './schemas';
import { registerSchema } from './schemas';

export type State = {
  errors?: {
    email?: string[];
    clave?: string[];
  };
  message?: string | null;
  fields?: {
    email?: string;
    clave?: string;
    nombreUsuario?: string;
  };
};

export type Alumno = {
    id: number;
    nombre: string;
    apellido: string;
    edad: number;
    curso: number;
}
export async function login(prevState: State, data: FormData): Promise<State> {
  const formData = Object.fromEntries(data);
    const submission = loginSchema.safeParse({
        email: formData.email,
        clave: formData.clave,
      });

      if (!submission.success) {
        const fields: Record<string, string> = {};
        for(const key of Object.keys(formData)  ){
          fields[key] = formData[key]?.toString() || '';
        }
        return {
          errors: submission.error.flatten().fieldErrors,
          message: 'No se ingresaron todos los campos.',
          fields:fields,
        };
      }
     /*
      // Prepare data for insertion into the database
      const { email, password } = submission.data;
      // Insert data into the database
      try {
        await axios.post('/api/invoices', {
          email,
          password,
        });
      } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
          message: 'Database Error: Failed to login.',
        };
      }*/
  redirect('/');

}
export async function register(prevState: State, data: FormData): Promise<State> {
  const formData = Object.fromEntries(data);
  const submission = registerSchema.safeParse({
    email: formData.email,
    nombreUsuario: formData.nombreUsuario,
    clave: formData.clave,
  });

  if (!submission.success) {
    const fields: Record<string, string> = {};
    for(const key of Object.keys(formData)  ){
      fields[key] = formData[key]?.toString() || '';
    }
    return {
      errors: submission.error.flatten().fieldErrors,
      message: 'No se ingresaron todos los campos.',
      fields:fields,
    };
  }
     /*
      // Prepare data for insertion into the database
      const { email, password } = submission.data;
      // Insert data into the database
      try {
        await axios.post('/api/invoices', {
          email,
          password,
        });
      } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
          message: 'Database Error: Failed to login.',
        };
      }*/
  redirect('/');

}
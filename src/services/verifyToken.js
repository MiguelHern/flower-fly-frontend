import { userQueries } from '@/api/user/userQueries.js'

export const verify = async () =>{
  const response = await userQueries.verifyUser(localStorage.getItem(import.meta.env.VITE_CREDENCIALES))

  return response
}

//FECHA ACTUAL
const hoy = new Date();
const anio = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, '0');
const dia = String(hoy.getDate()).padStart(2, '0');
export const fechaActual = `${anio}-${mes}-${dia}`;

//BASE 64 IMG

export const base64IMG = 'data:image/png;base64,'
export const base64PDF = 'data:application/pdf;base64,'

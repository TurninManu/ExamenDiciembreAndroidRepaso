import { Direccion } from './direccion';
export class Persona{
    constructor(public sexo:string, public apellidos:string, public nombre:string, public direccion:Direccion, public email:string, public nombreUsuario:string, 
    public clave:string, public telefono:string, public urlImagenLarge:string, public urlImagenMedium:string, public urlImagenThumbNail:string){}
}
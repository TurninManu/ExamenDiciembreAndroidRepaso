import { Persona } from './../../modelo/persona';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the JsonServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JsonServerProvider {

  listener:UserServiceProviderListener;

  setListener(listener:UserServiceProviderListener){
    this.listener=listener;
  }
  constructor(public http: HttpClient) {
    console.log('Hello JsonServerProvider Provider');
  }

  public getPersonas(codPais:string, numeroPersonas:number){
    console.log(codPais, numeroPersonas)
    this.http.get("https://randomuser.me/api/?nat="+codPais+"&results="+numeroPersonas).subscribe((data:any) => {
      console.log(data)
      this.listener.onGetPersonasResponse(data, null);
    }),
    (error => {
      this.listener.onGetPersonasResponse(null, "Error al leer las personas");
    });
  }

  
}

export interface UserServiceProviderListener {
  onGetPersonasResponse(persona:Persona[], error:string);
  }
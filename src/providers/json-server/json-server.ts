import { Persona } from './../../modelo/persona';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Direccion } from '../../modelo/direccion';

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
    this.http.get("https://randomuser.me/api/?nat="+codPais+"&results="+numeroPersonas).subscribe((data:Persona[]) => {
      let personasAux:Persona[]=new Array<Persona>();

      data["results"].forEach(element => {
        personasAux.push(new Persona(
          element["gender"],
          element["name"]["last"],
          element["name"]["first"],
          new Direccion(element["location"]["street"], element["location"]["city"], element["location"]["state"], element["location"]["postcode"]),
          element["email"],
          element["login"]["username"],
          element["login"]["password"],
          element["phone"],
          element["picture"]["large"],
          element["picture"]["medium"],
          element["picture"]["thumbnail"]
        ));
      });


      this.listener.onGetPersonasResponse(personasAux, null);
    }),
    (error => {
      this.listener.onGetPersonasResponse(null, "Error al leer las personas");
    });
  }

  
}

export interface UserServiceProviderListener {
  onGetPersonasResponse(personas:Persona[], error:string);
  }
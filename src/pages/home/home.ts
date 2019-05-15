import { Pagina2Page } from './../pagina2/pagina2';
import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  paises:any={'AU':'australia', 'BR':'brasil', 'DE':'alemania', 'DK':'dinamarca', 'ES':'españa', 'IR':'irán'};
  clavesPaises:any=Object.keys(this.paises);
  formulario:FormGroup;

  constructor(public navCtrl: NavController, public toastController: ToastController) {
    this.formulario=new FormGroup({
      usuario:new FormControl(),
      clave:new FormControl(),
      pais:new FormControl()
    })

    console.log(this.paises)

    
  }

  public comprobarLogin(){
    let mensajeError:string='';
    let mostrarError:boolean=false;
    if(this.formulario.value["usuario"]!="examen"){
      mensajeError+=' Usuario invalido,'
      mostrarError=true;
    }
    if(this.formulario.value["clave"]!="1234"){
      mensajeError+=' Clave invalida,'
      mostrarError=true;
    }
    if(this.formulario.value["pais"]==null){
      mensajeError+=' Debe escoger un pais'
      mostrarError=true;
    }

    if(mostrarError==true){
      const toast = this.toastController.create({
        message: mensajeError,
        duration: 2000
      });
      toast.present();
    }else{
      this.navCtrl.push(Pagina2Page, {"clavePais":this.formulario.value["pais"], "pais":this.paises[this.formulario.value["pais"]]});
      console.log(this.formulario.value["pais"] + "    "+ this.paises[this.formulario.value["pais"]]);
    }
    
  }

}

import { Pagina2Page } from './../pagina2/pagina2';
import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  paises:string[][]=[["AU", "australia"], ["BR", "brasil"], ["DE", "alemania"], ["DK", "dinamarca"], 
  ["ES", "españa"], ["IR", "irán"]];
  formulario:FormGroup;

  constructor(public navCtrl: NavController, public toastController: ToastController) {
    this.formulario=new FormGroup({
      usuario:new FormControl(),
      clave:new FormControl(),
      pais:new FormControl()
    })
  }

  public comprobarLogin(){
    if(this.formulario.value["usuario"]!="examen"){
      const toast = this.toastController.create({
        message: 'Usuario invalido',
        duration: 2000
      });
      toast.present();
    }
    if(this.formulario.value["clave"]!="1234"){
      const toast = this.toastController.create({
        message: 'Clave invalida',
        duration: 2100
      });
      toast.present();
    }
    if(this.formulario.value["pais"]==null){
      const toast = this.toastController.create({
        message: 'Debe escoger un pais',
        duration: 2200
      });
      toast.present();
    }
    
    if(this.formulario.value["usuario"]=="examen" && this.formulario.value["clave"]=="1234" && this.formulario.value["pais"]!=null){
      this.navCtrl.push(Pagina2Page, {"pais":this.formulario.value["pais"]});
      console.log(this.formulario.value["pais"] + "    "+ this.paises[1][1]);
    } 
  }

}

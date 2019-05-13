import { UserServiceProviderListener, JsonServerProvider } from './../../providers/json-server/json-server';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Persona } from '../../modelo/persona';

/**
 * Generated class for the Pagina2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagina2',
  templateUrl: 'pagina2.html',
})
export class Pagina2Page implements UserServiceProviderListener{ 
 
  pais:string;
  personas:Persona[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController, public jsonServerProvider:JsonServerProvider, public toastController:ToastController) {
    this.pais=navParams.get("pais");
    this.jsonServerProvider.setListener(this);
    console.log(this.pais);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pagina2Page');
  }

  public buscar(){
    const alert = this.alertController.create({
      title: 'Numero de personas',
      inputs: [
        {
          name: 'numero',
          type: 'number',
          min: 0
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.jsonServerProvider.getPersonas(this.pais,data.numero);
          }
        }
      ]
    });

    alert.present();
  }


  onGetPersonasResponse(persona:Persona[], error: string) {
    if(error==null){
      this.personas=persona;
    }else{
      const toast = this.toastController.create({
        message: error,
        duration: 2000
      });
      toast.present();
    }
  }

}

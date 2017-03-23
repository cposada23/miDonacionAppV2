import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriasBienesPage } from '../categorias-bienes/categorias-bienes';
/*
  Generated class for the Pregunta page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pregunta',
  templateUrl: 'pregunta.html'
})
export class PreguntaPage {
  pregunta:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    let perfil = this.navParams.get('perfil');
    switch(perfil){
      case 'Donante':
        this.pregunta = '¿Qué quieres donar?'
        break;
      case 'Beneficiario':
        this.pregunta = '¿Qué buscas?';
        break;
    }

  }
   irCategoriasBienes(){
    this.navCtrl.push(CategoriasBienesPage);
  }


}

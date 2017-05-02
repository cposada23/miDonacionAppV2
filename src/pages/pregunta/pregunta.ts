import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriasBienesPage } from '../categorias-bienes/categorias-bienes';
import { CategoriasServiciosPage } from '../categorias-servicios/categorias-servicios';
import { DonacionService } from '../../providers/donacion-service';
import { Auth } from '../../providers/auth';
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
  perfil:string;
  usuario:Object;
  constructor(public navCtrl: NavController, public navParams: NavParams, private donacionService:DonacionService, private auth:Auth) {}

  ionViewDidLoad() {
    this.perfil = this.navParams.get('perfil');
    
    switch(this.perfil){
      case 'Donante':
        this.pregunta = '¿Qué quieres donar?';
        this.usuario = this.auth.datosUsuario();
        this.donacionService.setUsuario(this.usuario['nombre'],this.usuario['key']);
        break;
      case 'Beneficiario':
        this.pregunta = '¿Qué buscas?';
        break;
    }

  }
   irCategoriasBienes(){
    this.navCtrl.push(CategoriasBienesPage, {
      perfil: this.perfil
    });
  }

  irServicios() {
    this.navCtrl.push(CategoriasServiciosPage, {
      perfil: this.perfil
    });
  }


}

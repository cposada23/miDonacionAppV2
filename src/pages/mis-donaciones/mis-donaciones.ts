import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MisDonacionesBienesPage } from '../mis-donaciones-bienes/mis-donaciones-bienes';
import { Usuario } from '../../models/usuario';
import { Auth } from '../../providers/auth';
/*
  Generated class for the MisDonaciones page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mis-donaciones',
  templateUrl: 'mis-donaciones.html'
})
export class MisDonacionesPage {
  key:string;
  usuario:Usuario;
  constructor(private auth:Auth, public navCtrl: NavController, public navParams: NavParams) {
    this.key = this.navParams.get('key');
    this.auth.getUser().subscribe(usuario => {
      console.log("usuarioasdfasfsaf en perfil:: ", usuario);
      this.usuario = Usuario.fromJson(usuario);     
    });
  }

  ionViewDidLoad() {
    
  }

  irMisDonaciones(){  
    this.navCtrl.push(MisDonacionesBienesPage, {
      key:this.key
    });
  }

}

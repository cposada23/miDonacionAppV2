import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { MisDonacionesPage } from '../mis-donaciones/mis-donaciones';
import { Auth } from '../../providers/auth';
/*
  Generated class for the Perfil page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  usuario:Usuario;
  constructor(public navCtrl: NavController, private auth: Auth, public navParams: NavParams) {
    this.auth.getUser().subscribe(usuario => {
      console.log("usuarioasdfasfsaf en perfil:: ", usuario);
      this.usuario = Usuario.fromJson(usuario);     
    });
  }

  ionViewDidLoad() {}

  irMisDonaciones(){  
    this.navCtrl.push(MisDonacionesPage, {
      key:this.usuario.$key
    });
  }

}

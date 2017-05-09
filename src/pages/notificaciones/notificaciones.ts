import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';

/*
  Generated class for the Notificaciones page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html'
})
export class NotificacionesPage {
  notificaciones:Array<any>;
  constructor(private auth:Auth, public navCtrl: NavController, public navParams: NavParams) {
    let key = this.auth.getUsuario().$key;
    this.auth.getNotificaciones(key).subscribe(notificaciones => {
      this.notificaciones = notificaciones;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesPage');
  }

}

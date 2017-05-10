import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { Observable } from 'rxjs/Rx';
import { ContactPage } from '../contact/contact';
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
  notificaciones$:Observable<any[]>;
  key:string;
  constructor(private auth:Auth, public navCtrl: NavController, public navParams: NavParams) {
    this.key = this.auth.getUsuario().$key;
    this.notificaciones$ =  this.auth.getNotificaciones(this.key);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesPage');
  }

  eliminarNotificacion(notificacion) {
    console.log("not", notificacion);
    this.auth.eliminarNotificacion(this.key,notificacion.$key).then(()=> {
      console.log("eliminada?");
    }).catch(error => {
      alert("error eliminado notificación");
      console.error("error");
    });
  }

  irContacto(notificacion) {
    const notificacionKey = notificacion.$key;
    const donacionkey = notificacion.donacionKey;
    const tipo = notificacion.tipo;
    const contactoKey= notificacion.contactoBienKey;
    this.navCtrl.push(ContactPage, {
        donacion: donacionkey,
        tipo: tipo,
        contactoKey: contactoKey
      });
    // this.auth.eliminarNotificacion(this.key, notificacionKey).then(() => {
    //   console.log("eliminada voy a contact");
    //   this.navCtrl.push(ContactPage, {
    //     donacion: donacionkey,
    //     tipo: tipo
    //   });
    // }).catch(error => {
    //   console.error(error);
    // });

  }

}

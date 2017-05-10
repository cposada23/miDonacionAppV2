import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import  { Auth } from '../../providers/auth';
/*
  Generated class for the ContactosHechos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contactos-hechos',
  templateUrl: 'contactos-hechos.html'
})
export class ContactosHechosPage {

  constructor(private auth: Auth, public navCtrl: NavController, public navParams: NavParams) {
    let Key = this.navParams.get('key');
    this.auth.getMisContactos(Key).subscribe(contactos  => {
      console.log("contactos hechos",contactos);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactosHechosPage');
  }

}

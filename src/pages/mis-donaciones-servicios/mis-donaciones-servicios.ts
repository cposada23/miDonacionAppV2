import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the MisDonacionesServicios page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mis-donaciones-servicios',
  templateUrl: 'mis-donaciones-servicios.html'
})
export class MisDonacionesServiciosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisDonacionesServiciosPage');
  }

}

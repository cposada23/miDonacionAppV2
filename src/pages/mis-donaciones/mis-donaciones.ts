import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MisDonacionesBienesPage } from '../mis-donaciones-bienes/mis-donaciones-bienes';
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
  constructor( public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.key = this.navParams.get('key');
  }

  irMisDonaciones(){  
    this.navCtrl.push(MisDonacionesBienesPage, {
      key:this.key
    });
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DonacionService } from '../../providers/donacion-service';

/*
  Generated class for the DetalleContactoBienes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detalle-contacto-bienes',
  templateUrl: 'detalle-contacto-bienes.html'
})
export class DetalleContactoBienesPage {
  contacto: any;
  donacion: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private donacionService: DonacionService) {
    this.contacto = this.navParams.get('contacto');
    this.donacionService.getDonacionBienesPorDonacionKey(this.contacto.donacionKey).subscribe(donacion => {
      this.donacion = donacion;
      console.log("donacionnn", donacion);
    });
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleContactoBienesPage');
  }

}

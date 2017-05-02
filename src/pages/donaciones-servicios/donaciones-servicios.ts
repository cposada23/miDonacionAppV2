import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DonacionService } from '../../providers/donacion-service';
import { Observable } from 'rxjs/Rx';
/*
  Generated class for the DonacionesServicios page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-donaciones-servicios',
  templateUrl: 'donaciones-servicios.html'
})
export class DonacionesServiciosPage {

  donaciones$: Observable<any[]>;
  constructor(private donacionService: DonacionService,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonacionesServiciosPage');
    const categoria = this.navParams.get('categoria');
    this.donaciones$ = this.donacionService.getDonacionesServiciosPorCategoria(categoria);

  }

}

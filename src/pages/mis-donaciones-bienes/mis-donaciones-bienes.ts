import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DonacionService } from '../../providers/donacion-service';
import { Observable } from 'rxjs/Rx';
import { ContactosPorDonacionBienesPage } from '../contactos-por-donacion-bienes/contactos-por-donacion-bienes';
/*
  Generated class for the MisDonacionesBienes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mis-donaciones-bienes',
  templateUrl: 'mis-donaciones-bienes.html'
})
export class MisDonacionesBienesPage {

  misDonaciones$: Observable<any[]>;
  constructor(private donacionService: DonacionService, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    const key = this.navParams.get('key');
    this.misDonaciones$ = this.donacionService.misDonacionesBienes(key);
  }
  irContactosDonacion(donacion) {
    console.log("ir a contactos de esta donacion ", donacion);

    this.navCtrl.push(ContactosPorDonacionBienesPage, {
      donacion: donacion.$key
    });
  }

}

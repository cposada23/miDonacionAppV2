import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DonacionService } from '../../providers/donacion-service';
import { Observable } from 'rxjs/Rx';
import { DetalleContactoBienesPage } from '../detalle-contacto-bienes/detalle-contacto-bienes';
/*
  Generated class for the ContactosPorDonacionBienes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contactos-por-donacion-bienes',
  templateUrl: 'contactos-por-donacion-bienes.html'
})
export class ContactosPorDonacionBienesPage {
  contactos$: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private donacionService: DonacionService) {
    let donacionKey = this.navParams.get('donacion');
    console.log("donacion key", donacionKey);
    this.contactos$ = this.donacionService.getContactosPorDonacion(donacionKey);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactosPorDonacionBienesPage');

  }
  irContacto(contacto) {
    console.log("contactooo", contacto);
    this.navCtrl.push(DetalleContactoBienesPage, {
      contacto: contacto
    });
  }

}

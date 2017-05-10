import { Component } from '@angular/core';

import { NavController, NavParams} from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { DonacionService } from '../../providers/donacion-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  donacionBienes:any;
  donacionServicios:any;
  contacto:any;
  constructor(private donacionService: DonacionService, public navCtrl: NavController, private auth:Auth, public navParams:NavParams) {
    let donacion = this.navParams.get('donacion');
    let contactoKey = this.navParams.get('contactoKey');
    let tipo = this.navParams.get('tipo')
    this.donacionService.getContacto(contactoKey).subscribe(contacto => {
      console.log("contactooooooo ", contacto);
      this.contacto = contacto;
    }, error => {
      console.log("error");
    });
    if('donacionBienes' === tipo){
      this.donacionService.getDonacionBienesPorDonacionKey(donacion).subscribe(donacion => {
        this.donacionBienes = donacion;
        console.log("this.donacionBienes", this.donacionBienes);
      },error => {
        console.error("error", error);
      });
    }

  }

}

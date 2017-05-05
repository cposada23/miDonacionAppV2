import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DonacionService } from '../../providers/donacion-service';
import { Observable } from 'rxjs/Rx';

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

  misDonaciones$: Observable<any[]>;
  constructor(private donacionService: DonacionService, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
     const key = this.navParams.get('key');
     this.misDonaciones$ = this.donacionService.misDonacionesServicios(key);
  
  }

}

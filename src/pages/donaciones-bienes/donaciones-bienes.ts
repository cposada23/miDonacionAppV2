import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DonacionService } from '../../providers/donacion-service';
import { Observable } from 'rxjs/Rx';
/*
  Generated class for the DonacionesBienes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-donaciones-bienes',
  templateUrl: 'donaciones-bienes.html'
})
export class DonacionesBienesPage {
  donaciones$: Observable<any[]>;
  constructor(private donacionService: DonacionService,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    const subcategoria = this.navParams.get('subcategoria');
    this.donaciones$ = this.donacionService.getDonacionesPorSubcategoria(subcategoria);
  }

}

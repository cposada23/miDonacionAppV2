import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DonacionService } from '../../providers/donacion-service';
import { Observable } from 'rxjs/Rx';
import { ContactoBienesPage } from '../contacto-bienes/contacto-bienes';
import { Auth } from '../../providers/auth';
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
  nombreSubcategoria: string;
  keyUsuario: string;
  constructor(private alertCtrl: AlertController, private auth:Auth, private donacionService: DonacionService,public navCtrl: NavController, public navParams: NavParams) {
    this.keyUsuario = this.auth.getUsuario().$key;

  }

  ionViewDidLoad() {
    const subcategoria = this.navParams.get('subcategoria');
    this.donaciones$ = this.donacionService.getDonacionesPorSubcategoria(subcategoria);
    this.nombreSubcategoria = this.navParams.get('nombreSubcategoria')
    console.log("nombre sucaaaaaaaaaaa : ", this.nombreSubcategoria);
  }

  irContacto(donacion){
    console.log("ir a contacto donacion: ", donacion);
    let subs  = this.auth.puedeContactarBienes(donacion.$key, this.keyUsuario).subscribe(data => {
      console.log("dataaaa", data);
      console.log("data.value", data.$value)
      console.log("data.exist", data.$exists());
      if(!data.$exists()) {
        this.navCtrl.push(ContactoBienesPage, {
          donacion: donacion
        });
      }
      else {
        this.notificar();
      }if( subs ){
        subs.unsubscribe();
      }
      
    });
    
  }

  notificar() {
    let alert = this.alertCtrl.create({
      title: 'Ya hiciste contacto para esta publicacion, espera que te repondan',
      buttons:['Ok']
    });
    alert.present();
  }

}

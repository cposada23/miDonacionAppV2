import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { DonacionService } from '../../providers/donacion-service';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Usuario } from '../../models/usuario';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
/*
  Generated class for the NuevaDonacionServicio page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-nueva-donacion-servicio',
  templateUrl: 'nueva-donacion-servicio.html'
})
export class NuevaDonacionServicioPage {
  donacion: FormGroup;
  loader:any;
  usuario:Usuario;
  constructor(private auth:Auth, public loadingCtrl: LoadingController,  private donacionService:DonacionService,    private formBuilder:FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.usuario = this.auth.getUsuario();
    this.donacion = this.formBuilder.group({
      titulo:['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaDonacionServicioPage');
  }


  continuar(){
    this.presentloading();
    const donacionValue = this.donacion.value;
    // this.donacionService.setDonacion(donacionValue.titulo, donacionValue.descripcion, donacionValue.estado);
    this.donacionService.nuevaDonacionServicio(donacionValue.titulo, donacionValue.descripcion).subscribe(()=>{
      this.loader.dismiss();
      alert('donacion de servicio creada');
      this.donacionService.aumentarDonacionesServicios(this.usuario.$key);
      this.navCtrl.push(HomePage);
    }, error => {
      this.loader.dismiss();
      alert('Error creando donacion');
    });

    

  }


  presentloading(){
    this.loader = this.loadingCtrl.create({
      content:"Creando donacion..."
    });
    this.loader.present();
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { DonacionService } from '../../providers/donacion-service';
import { Auth } from '../../providers/auth'; 
import { Usuario } from '../../models/usuario';
/*
  Generated class for the ContactoBienes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contacto-bienes',
  templateUrl: 'contacto-bienes.html'
})
export class ContactoBienesPage {
  contacto: FormGroup;
  usuario:Usuario;
  donacion:Object;
  constructor(private auth:Auth, private donacionService: DonacionService, private formBuilder:FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.contacto = this.formBuilder.group({
      mensaje: ['', Validators.required]
    });
    this.usuario = this.auth.getUsuario();
    this.donacion = this.navParams.get('donacion');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactoBienesPage');
    console.log("Donacion ", this.navParams.get('donacion'))
  }

  contactar() {
    const mensaje = this.contacto.value.mensaje;
    console.log("mensaje ", mensaje);
    console.log("donacion", this.donacion);
    this.donacionService.contacto(this.usuario.$key, this.usuario.nombre + ' ' + this.usuario.apellidos,
      this.donacion['$key'], this.donacion['usuarioKey'], mensaje ).subscribe(() => {
        alert("contacto creado");
        this.navCtrl.pop();
      },error => {
        alert('error');
        console.error(error);
      });

  } 

}

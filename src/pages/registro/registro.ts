import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';
import { Auth } from '../../providers/auth';

/*
  Generated class for the Registro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {
  form: FormGroup;
  loader:any;
  constructor(public auth:Auth, public loadingCtrl:LoadingController, public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder, public toastCtrl:ToastController) {
    this.form = this.formBuilder.group({
      email:     ['', Validators.required],
      password:  ['', Validators.required],
      confirm:   ['', Validators.required],
      nombre:    ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula:['', Validators.required],
      celular: ['', Validators.required],
      genero: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

   registro (){
    const usuario = this.form.value;
    this.presentloading();
    if(usuario.password !== usuario.confirm){
      this.presentToast("las contraseñas no coinciden");
    }else{
      this.auth.registro(usuario.email, usuario.password).then((auth)=>{
        
        let u = {
          nombre: usuario.nombre,
          apellidos: usuario.apellidos, 
          email: usuario.email, 
          cedula: usuario.cedula,
          celular: usuario.celular,
          genero: usuario.genero,
        }
        this.auth.guardarUsuario(u, auth.uid).then(()=>{
          
         

        }).catch(error=>{
          console.error(error);
          this.presentToast(error.message);
          this.loader.dismiss();
        });

      }).catch(error=>{
        console.error(error);
        this.presentToast(error.message);
        this.loader.dismiss();
      });
    }
    
  }

  presentToast(mensaje){
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration:3000
    });
    toast.present();
  }

  irLogin(){
    this.navCtrl.pop();
  }
  isPasswordMatch() {
        const val = this.form.value;
        return val && val.password && val.password == val.confirm;
    }

    presentloading(){
    this.loader = this.loadingCtrl.create({
      content:"Registrando..."
    });
    this.loader.present();
  }

}

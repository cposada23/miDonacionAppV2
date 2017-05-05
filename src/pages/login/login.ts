import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ToastController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { Auth } from '../../providers/auth';
import { TabsPage } from '../tabs/tabs';
/*
  Generated class for the Login page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  form: FormGroup;
  vieneSubCategoria = false;
  loader:any;
  perfil:string;
  categoria:string;
  subCategoria:string;
  constructor(public toastCtrl:ToastController, public auth:Auth, public app:App, public loadingCtrl:LoadingController, public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder) {
    this.form = this.formBuilder.group({
      email:['', Validators.required],
      password: ['', Validators.required]
    });
    this.perfil = this.auth.getPerfil();
    this.categoria = this.navParams.get('categoria');
    this.subCategoria = this.navParams.get('subCategoria');
    //console.log("this.perfil en login ", this.perfil);
  }

  ionViewDidLoad() {
    
  }

  presentloading(){
    this.loader = this.loadingCtrl.create({
      content:"Autenticando..."
    });
    this.loader.present();
  }

  login(){
    const formValue = this.form.value;
    this.presentloading();
    this.auth.login(formValue.email, formValue.password).then(auth=>{
      console.log("auth", auth.auth.getToken());
      this.loader.dismiss();
      this.presentToast('Login correcto');
      this.app.getRootNav().setRoot(TabsPage,{
        perfil: this.perfil,
        categoria: this.categoria,
        subCategoria: this.subCategoria
      });
    }).catch(error=>{
      console.error(error);
      this.presentToast(error.message)
      this.loader.dismiss();
    });
      
  }

  irRegistro(){
    this.navCtrl.push(RegistroPage);
  }

  presentToast(message:string){
    let toast = this.toastCtrl.create({
      message:message,
      duration:3000,
      position:'top'
    });
    toast.present();
  }


}

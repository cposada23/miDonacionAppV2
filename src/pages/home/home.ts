import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistroPage } from '../registro/registro';
import { PreguntaPage } from '../pregunta/pregunta';
import { Auth } from '../../providers/auth';
import { AlertController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  autenticado:boolean;

  constructor(public af:AngularFire, public alertCtrl: AlertController, public app:App, private auth: Auth, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.af.auth.subscribe(auth => {
      if(auth){
        this.autenticado =true;
      }else{
        this.autenticado =false;
      }
    });
    //console.log("Navparams en home", this.navParams.data);
    let perfil = this.navParams.get('perfil');
    switch(perfil){
      case 'Donante':
        console.log("donante en tabs");
        //this.app.getRootNav().push(PreguntaPage);
        //this.tab1Root.push(PreguntaPage);
        //this.navCtrl.push(PreguntaPage);
        this.irDonar();
        break;
      case 'Beneficiario':
        console.log("beneficiario");
        break;
      default:
        console.log("undefined en home");
        break;
    }
}

  irLogin(){
    this.navCtrl.push(LoginPage);
  }  

  irDonar(){
    this.auth.setPerfil('Donante');
    if(this.auth.isAutenticado()){
      this.navCtrl.push(PreguntaPage, {
        perfil:'Donante',
        pregunta:'¿Qué quieres donar?'
      });
    }else{
      this.showPrompt();
    }
  
  }

  irBeneficio(){
    this.auth.setPerfil('Beneficiario');
    this.navCtrl.push(PreguntaPage,{
      perfil:'Beneficiario',
      pregunta: '¿Qué necesitas'
    });
  }

  logout(){
    this.auth.logout().then(()=>{
      this.autenticado = false;
      this.app.getRootNav().setRoot(HomePage);
    });
    
  }


   showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'INFO',
      message: "Para donar necesitas estar registrado",
      buttons: [
        {
          text: 'login',
          handler: data => {
            this.navCtrl.push(LoginPage,{
              vieneADonar:true
            });
          }
        },
        {
          text: 'registro',
          handler: data => {
            this.navCtrl.push(RegistroPage,{
              vieneADonar:true
            });
          }
        }
      ]
    });
    prompt.present();
  }
}

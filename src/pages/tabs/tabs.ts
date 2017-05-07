import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NotificacionesPage } from '../notificaciones/notificaciones';
import { PerfilPage } from '../perfil/perfil';
import { NavController, NavParams, App } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { Auth } from '../../providers/auth';
//import { PreguntaPage } from '../pregunta/pregunta';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = NotificacionesPage;
  tab3Root: any = PerfilPage;
  params:NavParams;
  //perfil: string;
  usuario:Usuario;
  keyUsuario: string;
  numNotificaciones = 0;
  constructor(private auth:Auth, private app:App, private navCtrl: NavController, private navParams: NavParams) {
    //this.perfil = this.navParams.get('perfil');
    this.params = this.navParams;
    this.usuario = this.auth.getUsuario();
    //
    // if (this.auth){
    //   console.log("hola")
    // }else{console.log("no")}
    // setInterval(()=>{
    //   this.numNotificaciones ++;
    // },1000);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
   // this.keyUsuario = this.auth.getUsuario().$key;
  }

}

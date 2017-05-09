import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NotificacionesPage } from '../notificaciones/notificaciones';
import { PerfilPage } from '../perfil/perfil';
import { NavController, NavParams, App } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { Auth } from '../../providers/auth';
import { AngularFire } from 'angularfire2';
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
  notificaciones: Array<any>;
  parametros = {};
  constructor(private auth:Auth, private af: AngularFire, private app:App, private navCtrl: NavController, private navParams: NavParams) {
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

    this.af.auth.subscribe(auth => {
      console.log("authh en tabssssss", auth);
      let sus:any;
      let sus1:any;
      if(auth){
        console.log("ajsldkfja", auth.uid);
        sus = this.auth.getUsuarioActivo(auth.uid).subscribe(usuario => {
          console.log("usuario en tabs", usuario);
          sus1 = this.auth.getNotificaciones(usuario.$key).subscribe(notificaciones => {
            console.log("notificaciones", notificaciones);
            this.notificaciones = notificaciones;
            this.parametros['notificaciones'] = this.notificaciones;
            this.numNotificaciones = this.notificaciones.length;
          });
          
        }, error => {
          console.error(error);
        })
      }else {
        if(sus) {
          sus.unsubscribe();
        }
        if(sus1) {
          sus1.unsubscribe();
        }
        console.log("no hay auth en tabssss");
      }
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
   // this.keyUsuario = this.auth.getUsuario().$key;
  }

}

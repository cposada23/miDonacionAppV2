import { Component, Inject } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { DonacionService } from '../../providers/donacion-service';
import { Utils } from '../../providers/utils';
import { FirebaseRef } from 'angularfire2/index';
import { Usuario } from '../../models/usuario';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
/*
  Generated class for the ConfirmarDonacion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-confirmar-donacion',
  templateUrl: 'confirmar-donacion.html'
})
export class ConfirmarDonacionPage {
  donacion:Object;
  imagenes:Array<string>;
  nombreUsuario:string;
  fecha:Date;
  storage: any;
  usuario:Usuario;
  loader:any;
  constructor(public loadingCtrl:LoadingController, private auth:Auth, @Inject(FirebaseRef) fb,private utils: Utils, public navCtrl: NavController, private donacionService:DonacionService, public navParams: NavParams) {
    this.storage = fb.storage().ref();
    this.donacion = this.donacionService.getDonacion();
    this.nombreUsuario = this.donacion['usuarioNombre'];
    this.imagenes = this.navParams.get('imagenes');
    this.fecha = new Date();
    this.usuario = this.auth.getUsuario();
    console.log("usuario activo para realizar donacion", this.usuario);
  }

  ionViewDidLoad() {}

  confirmar(){
    this.presentloading();
    if(this.imagenes){
      let promesas = this.imagenes.map((url) => {
        return new Promise((resolve, reject) => {
          this.upload2(url, resolve, reject);
        });
      });
      Promise.all(promesas).then((res) =>{ 
        this.crearDonacion(res);
      }).catch((error) =>{
        alert('Ocurrio un error subiendo imagenes');
        this.loader.dismiss();
      });
    }else{
      this.crearDonacion(null);
    }
  }

  crearDonacion(urls:Array<any>){
    this.donacionService.nuevaDonacion(urls).subscribe(() => {
      this.loader.dismiss();
      alert('donacionCreada');
      this.donacionService.aumentarDonacionesBienes(this.usuario.$key);
      this.navCtrl.push(HomePage);
    },(error) => {
      this.loader.dismiss();
      alert('Error creando donacion');
    });
  } 

  subir(url, resolve, reject){
    console.log("url", url);
    resolve(url);
  }

  upload2(url, resolve, reject){
    //console.log(url);
    const nombre = url.split('/').pop();
    this.utils.getBlobFromUrl(url).then((blob) => {
      try {
        let uploadTask = this.storage.child('images/donacionBienes/'+this.usuario.$key+'/'+nombre).put(blob);
        uploadTask.on('state_changed', 
            (snapshot)=>{
          },
          (error) =>{
            alert(error);
            reject(error)
          
          },
          () => {
          
            try {
              const downloadURL = uploadTask.snapshot.downloadURL;
              alert('success');
              resolve(downloadURL);
            } catch (error) {
              alert('success cathc ');
              alert(error);
              resolve();
            }
          
          }
      )}catch (error) {
        alert(error);
        reject(error)
      }
    }).catch((error) => {
      alert(error);
      reject(error)
      
    });

  }

  upload(): Promise<any>{
    const url = this.imagenes[0];
    alert(url);
    
    return new Promise((resolve, reject) => {
      this.utils.getBlobFromUrl(url).then((blob) => {
        try {
          let uploadTask = this.storage.child('images').put(blob);
          uploadTask.on('state_changed', 
            (snapshot)=>{
          },
          (error) =>{
            reject(error)
            alert(error);
          },
          () => {
            alert('success');
            resolve();
          }
        )}catch (error) {
          reject(error)
          alert(error);
        }
      }).catch((error) => {
        reject(error)
        alert(error);
      });
    });
    
  }

  presentloading(){
    this.loader = this.loadingCtrl.create({
      content:"Creando donacion..."
    });
    this.loader.present();
  }

}

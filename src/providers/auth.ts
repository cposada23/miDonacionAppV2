import { Injectable, Inject  } from '@angular/core';
import { AngularFire, AngularFireDatabase, FirebaseRef  } from 'angularfire2'; 
import { ToastController } from 'ionic-angular';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'
@Injectable()
export class Auth {
  usuario:Usuario;
  autenticado:boolean = false;
  sdk:any;
  perfil:string;
  ref: any;
  constructor(private toastCtrl: ToastController, @Inject(FirebaseRef) fb ,private af: AngularFire, private db: AngularFireDatabase) {
    this.sdk = fb.database().ref();
    this.af.auth.subscribe(auth => {
      if(auth){
        this.autenticado = true;
        this.getUsuarioActivo(auth.uid).subscribe(usuario=>{
          console.log("usuario en authhhhhh", usuario);
          this.usuario = Usuario.fromJson(usuario);

          this.ref = fb.database().ref('notificaciones/'+auth.uid);
          this.ref.on('child_added', (data) => {
            console.log("data: ", data.val());
            
            this.notificar();
            
          });
          // setInterval(() => {
          //     this.notificar();
          // }, 10000);
          // var ref = this.db.list(`/notificaciones/${auth.uid}`);
          // ref.$ref.on("child_added", (child) => {
          //   console.log("child addedd", child);
          //   this.notificar();
          // });
        
        });


      }else{
        this.autenticado = false;
      }
    });
   }

   isAutenticado():boolean {
     return this.autenticado;
   }
   getUsuario():Usuario{
     return this.usuario;
   }

   getUser():Observable<any>{
     if(this.usuario){
       return this.db.object('usuarios/'+this.usuario.$key);
     }
   }

   getUsuarioActivo(uid){
    return this.db.object('usuarios/'+uid);  
   }

   setPerfil(perfil){
     this.perfil = perfil;
   }

   getPerfil():string{
     return this.perfil;
   }

   datosUsuario():Object{
     const usuario = {
      nombre: this.usuario.nombre + ' ' + this.usuario.apellidos,
      key: this.usuario.$key
     }
     return usuario;
   }

   login(email:string, password:string){
     return this.af.auth.login({email, password});
   }

   logout(){
     
     this.usuario = null;
     this.ref.off();
     return this.af.auth.logout();
   }

   guardarUsuario(usuario:any, uid:string){
     return this.sdk.child("usuarios").child(uid).set(usuario);
   }

   registro(email, password){
    return this.af.auth.createUser({email,password});
  }

  puedeContactarBienes(donacionKey:string, usuarioKey: string): Observable<any> {
    return this.db.object(`misContactosPorDonaciones/${usuarioKey}/${donacionKey}`);
  }

  notificar() {
    let toast = this.toastCtrl.create({
      message: 'Alguien solicitó tu donacion',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'top'
    });
    toast.present();
  }

   
}

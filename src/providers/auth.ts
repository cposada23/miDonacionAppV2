import { Injectable, Inject  } from '@angular/core';
import { AngularFire, AngularFireDatabase, FirebaseRef  } from 'angularfire2'; 
import { Usuario } from '../models/usuario';
@Injectable()
export class Auth {
  usuario:Usuario;
  autenticado:boolean = false;
  sdk:any;
  perfil:string;
  constructor(@Inject(FirebaseRef) fb ,private af: AngularFire, private db: AngularFireDatabase) {
    this.sdk = fb.database().ref();
    this.af.auth.subscribe(auth => {
      if(auth){
        this.autenticado = true;
        this.getUsuarioActivo(auth.uid).subscribe(usuario=>{
          this.usuario = Usuario.fromJson(usuario);
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
      nombre: this.usuario.nombre,
      key: this.usuario.$key
     }
     return usuario;
   }

   login(email:string, password:string){
     return this.af.auth.login({email, password});
   }

   logout(){
     
     this.usuario = null;
     return this.af.auth.logout();
   }

   guardarUsuario(usuario:any, uid:string){
     return this.sdk.child("usuarios").child(uid).set(usuario);
   }

   registro(email, password){
    return this.af.auth.createUser({email,password});
  }

   
}

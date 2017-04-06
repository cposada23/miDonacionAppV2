import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Donacion } from '../models/donacion';
import { File } from '@ionic-native/file';
import { Subject, Observable} from 'rxjs/Rx';
import { FirebaseRef } from 'angularfire2/index';
import 'rxjs/add/operator/map';

/*
  Generated class for the DonacionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DonacionService {
  _donacion: Donacion;
  donacion:Object = {}
  sdkDb:any;
  constructor(@Inject(FirebaseRef) fb,private filePlugin:File, public http: Http) {
    this.sdkDb = fb.database().ref();
  }
  setUsuario(nombre:string, key:string){
    this.donacion['usuarioNombre'] = nombre;
    this.donacion['usuarioKey'] = key;
    console.log("set usuario", this.donacion);
  }

  setCategoria(nombre:string, key:string){
    this.donacion['categoriaNombre'] = nombre;
    this.donacion['categoriaKey'] = key;
    console.log("set categoria", this.donacion);
  }

  setSubCategoria(nombre:string, key:string){
    this.donacion['subCategoriaNombre'] = nombre;
    this.donacion['subCategoriaKey'] = key;
    console.log("setSubCategoria", this.donacion);
  }

  setDonacion(titulo:string, descripcion:string, estado:string){
    this.donacion['titulo'] = titulo;
    this.donacion['descripcion'] = descripcion;
    this.donacion['estado'] = estado;
    console.log("this.donacion", this.donacion);
  }

  getDonacion():Object{
    return this.donacion;
  }

  nuevaDonacion(urls:Array<any>){
    if(this.donacion){
      console.log(this.donacion);
      this.donacion['urlImagenes'] = urls;
      this.donacion['fecha'] = new Date();
      const usuarioKey = this.donacion['usuarioKey'];
      const subCategoriaKey = this.donacion['subCategoriaKey'];
      let dataToSave = {};
      const donacionKey = this.sdkDb.child('donacionesBienes').push().key;
      dataToSave[`donacionesBienesUsuario/${usuarioKey}/${donacionKey}`] = true;
      dataToSave[`donacionesBienesPorSubCategoria/${subCategoriaKey}/${donacionKey}`] = true;
      dataToSave[`donacionesBienes/${donacionKey}`] = this.donacion;
      return this.firebaseUpdate(dataToSave); 
    }
  }

   firebaseUpdate(dataToSave){
    const subject = new Subject();
    this.sdkDb.update(dataToSave).then(
      val=>{
        subject.next(val);
        subject.complete();
      },
      err=>{
        subject.error(err);
        subject.complete();
      }
    );
    return subject.asObservable();
  }


}

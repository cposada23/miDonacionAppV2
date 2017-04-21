import { Injectable, Inject } from '@angular/core';
import { Subject} from 'rxjs/Rx';
import { FirebaseRef, AngularFireDatabase } from 'angularfire2/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map';

/*
  Generated class for the DonacionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DonacionService {
  donacion:Object = {}
  sdkDb:any;
  constructor(private angularFireDatabase: AngularFireDatabase, @Inject(FirebaseRef) fb) {
    this.sdkDb = fb.database().ref();
  }
  setUsuario(nombre:string, key:string){
    this.donacion['usuarioNombre'] = nombre;
    this.donacion['usuarioKey'] = key;
  }

  setCategoria(nombre:string, key:string){
    this.donacion['categoriaNombre'] = nombre;
    this.donacion['categoriaKey'] = key;
  }

  setSubCategoria(nombre:string, key:string){
    this.donacion['subCategoriaNombre'] = nombre;
    this.donacion['subCategoriaKey'] = key;
  }

  setDonacion(titulo:string, descripcion:string, estado:string){
    this.donacion['titulo'] = titulo;
    this.donacion['descripcion'] = descripcion;
    this.donacion['estado'] = estado;
  }

  clear(){
    this.donacion = {};
  }

  getDonacion():Object{
    return this.donacion;
  }

  nuevaDonacion(urls:Array<any>){
    if(this.donacion){
      this.donacion['urlImagenes'] = urls;
      this.donacion['fecha'] = new Date();
      this.donacion['reversed'] = 0 - Date.now();
      const usuarioKey = this.donacion['usuarioKey'];
      const subCategoriaKey = this.donacion['subCategoriaKey'];
      let dataToSave = {};
      const donacionKey = this.sdkDb.child('donacionesBienes').push().key;
      dataToSave[`donacionesBienesUsuario/${usuarioKey}/${donacionKey}`] = {'reversed': 0 - Date.now()};
      dataToSave[`donacionesBienesPorSubCategoria/${subCategoriaKey}/${donacionKey}`] = {'reversed': 0 - Date.now()};
      dataToSave[`donacionesBienes/${donacionKey}`] = this.donacion;
      return this.firebaseUpdate(dataToSave); 
    }
  }

  getDonacionesBienesKeysPorUsuario(usuarioKey:string): Observable<string[]>{
    // dspu : Donaciones por usuario
    // dpu  : Donación por usuario
    return this.angularFireDatabase.list(`donacionesBienesUsuario/${usuarioKey}`,
      {
        query:{
          orderByChild:'reversed'
        }
      }).map(dspu => dspu.map(dpu => dpu.$key));

  }

  getDonacionesBienesKeysPorSubcategoria(subcategoria:string): Observable<string[]>{
    // dspsc : Donaciones por subcategoria
    // dpsc  : Donación por subcategoria 
    return this.angularFireDatabase.list(`donacionesBienesPorSubCategoria/${subcategoria}`,
      {
        query:{
          orderByChild:'reversed'
        }
      }).map(dspsc => dspsc.map(dpsc => dpsc.$key));
  }

  getDonacionesBienesPorDonacionKey(keys$: Observable<string[]>):Observable<any[]> {
    // dspu : Donaciones por usuario
    // dpu  : Donación por usuario
    return keys$.map(dspu => dspu.map(dpu => this.angularFireDatabase.object(`donacionesBienes/${dpu}`)))
      .flatMap(fbojs => Observable.combineLatest(fbojs));
  }

  misDonacionesBienes(usuarioKey:string):Observable<any[]>{
    return this.getDonacionesBienesPorDonacionKey(this.getDonacionesBienesKeysPorUsuario(usuarioKey));
  }

  getDonacionesPorSubcategoria(subcategoria: string): Observable<any[]>{
    return this.getDonacionesBienesPorDonacionKey(this.getDonacionesBienesKeysPorSubcategoria(subcategoria));
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

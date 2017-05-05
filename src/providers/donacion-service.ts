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
  donacionServicio:Object = {};
  sdkDb:any;
  constructor(private angularFireDatabase: AngularFireDatabase, @Inject(FirebaseRef) fb) {
    this.sdkDb = fb.database().ref();
  }
  setUsuario(nombre:string, key:string){
    this.donacion['usuarioNombre'] = nombre;
    this.donacion['usuarioKey'] = key;
    this.donacionServicio['usuarioNombre'] = nombre;
    this.donacionServicio['usuarioKey'] = key;
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

  setCategoriaServicio(nombre: string, key: string) {
    this.donacionServicio['categoriaNombre'] = nombre;
    this.donacionServicio['categoriaKey'] = key;
  }

  clear(){
    this.donacion = {};
  }

  getDonacion():Object{
    return this.donacion;
  }

  getDonacionServicio(): Object {
    return this.donacionServicio;
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

  nuevaDonacionServicio(titulo: string, descripcion: string) {
    this.donacionServicio['titulo'] = titulo;
    this.donacionServicio['descripcion'] = descripcion;
    this.donacionServicio['reversed'] = 0 - Date.now();
    const usuarioKey = this.donacionServicio['usuarioKey'];
    const categoria = this.donacionServicio['categoriaKey'];
    const donacionKey = this.sdkDb.child('donacionesServicios').push().key;
    let dataToSave = {};
    dataToSave[`donacionesServiciosUsuario/${usuarioKey}/${donacionKey}`] = {'reversed': 0 - Date.now()};
    dataToSave[`donacionesServiciosPorCategoria/${categoria}/${donacionKey}`] = {'reversed': 0 - Date.now()};
    dataToSave[`donacionesServicios/${donacionKey}`] = this.donacionServicio;
    return this.firebaseUpdate(dataToSave);
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

  getDonacionesServiciosKeysPorUsuario(usuarioKey: string): Observable<string[]>{
    // dspu : Donaciones por usuario
    // dpu  : Donación por usuario
    return this.angularFireDatabase.list(`donacionesServiciosUsuario/${usuarioKey}`,
      {
        query:{
          orderByChild:'reversed'
        }
      }).map(dspu => dspu.map(dpu => dpu.$key));

  }
  
  misDonacionesServicios(usuarioKey: string): Observable<any[]> {
    return this.getDonacionesServiciosPorDonacionKey(this.getDonacionesServiciosKeysPorUsuario(usuarioKey));
  }

  getDonacionesPorSubcategoria(subcategoria: string): Observable<any[]>{
    return this.getDonacionesBienesPorDonacionKey(this.getDonacionesBienesKeysPorSubcategoria(subcategoria));
  }


  /**Donaciones servicios */
  getDonacionesServiciosKeysPorCategoria(categoria:string): Observable<string[]>{
    // dspc : Donaciones por categoria
    // dpc  : Donación por categoria 
    return this.angularFireDatabase.list(`donacionesServiciosPorCategoria/${categoria}`,
      {
        query:{
          orderByChild:'reversed'
        }
      }).map(dspc => dspc.map(dpc => dpc.$key));
  }

  getDonacionesServiciosPorDonacionKey(keys$: Observable<string[]>):Observable<any[]> {
    // dss : Donaciones servicio
    // ds  : Donación por servicio
    return keys$.map(dss => dss.map(ds => this.angularFireDatabase.object(`donacionesServicios/${ds}`)))
      .flatMap(fbojs => Observable.combineLatest(fbojs));
  }


  getDonacionesServiciosPorCategoria(categoria: string):Observable<any[]> {
    // return this.getDonacionesBienesPorDonacionKey(this.getDonacionesBienesKeysPorSubcategoria(subcategoria));
    return this.getDonacionesServiciosPorDonacionKey(this.getDonacionesServiciosKeysPorCategoria(categoria));
  }

  /**
   * Se aumenta el numero de donaciones hechas por un usuario 
   * cada ves que este realiza una nueva donacion
   */
  aumentarDonacionesBienes(usuarioKey:string) {
    this.sdkDb.child(`usuarios/${usuarioKey}/donacionesHechas`).transaction(function(data) {
      data ++;
      return data;
    });

    this.sdkDb.child(`usuarios/${usuarioKey}/donacionesBienes`).transaction(function(data) {
      data ++;
      return data;
    });
  }


  aumentarDonacionesServicios(usuarioKey:string) {
    this.sdkDb.child(`usuarios/${usuarioKey}/donacionesHechas`).transaction(function(data) {
      data ++;
      return data;
    });

    this.sdkDb.child(`usuarios/${usuarioKey}/donacionesServicios`).transaction(function(data) {
      data ++;
      return data;
    });
  }

  contacto(usuarioKey: string, nombreUsuario: string, donacionKey: string, donanteKey: string,
           mensaje: string)
  {
    let contactoBienes = {
      contacta: usuarioKey,
      nombreBeneficiario: nombreUsuario,
      donacionKey: donacionKey,
      reversed: 0 - Date.now(),
      mensaje: mensaje
    }
    console.log("contactoBiene", contactoBienes);
    let dataToSave = {};
    dataToSave[`contactoBienes/${donacionKey}`] = contactoBienes;
    return this.firebaseUpdate(dataToSave);
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

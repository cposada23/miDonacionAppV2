import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Donacion } from '../models/donacion';
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
  constructor(public http: Http) {
    console.log('Hello DonacionService Provider');
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
  setDonacion(titulo:string, descripcion:string, estado:string, fotos:Array<File>){
    this.donacion['titulo'] = titulo;
    this.donacion['descripcion'] = descripcion;
    this.donacion['fotos'] = fotos;
    console.log("this.donacion", this.donacion);
  }

  getDonacion():Object{
    return this.donacion;
  }

  nuevaDonacion(){
    if(this.donacion){
      console.log(this.donacion);
    }
  }

}

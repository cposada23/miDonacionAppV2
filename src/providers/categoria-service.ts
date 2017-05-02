

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseRef, AngularFire } from 'angularfire2';
import { CategoriaBienes } from '../models/categoriasBienes';
import { CategoriaServicio } from '../models/categoriaServicio';
import 'rxjs/add/operator/map';
@Injectable()
export class CategoriaService {
  sdkDb: any;
  constructor(private af: AngularFire, private db:AngularFireDatabase, @Inject(FirebaseRef) fb) {
    this.sdkDb = fb.database().ref();
  }

  getCategoriasBienes(){
    return this.db.list('categoriasBienes').map(CategoriaBienes.fromjsonArray)
  }
  getCategoriasServicios(){
    return this.db.list('categoriasServicios').map(CategoriaServicio.fromjsonArray)
  }

  getCategoriaBienesPorNombre(nombre:string):Observable<CategoriaBienes>{
    return this.db.list('categoriasBienes', {
      query:{
        orderByChild: 'nombre',
        equalTo: nombre
      }
    }).filter(results => results && results.length>0)
    .map(results => CategoriaBienes.fromJson(results[0]));
  }


  /**
   * Obtiene las llaves de las subcategorias que pertenecen a una categoria especifica
   * @param categoriaId $key de la categoria a la que quiero obtener las subcategorias
   */
  getSubCategoriasKeysPorCategoria(categoriaId:string):Observable<string[]>{
    return this.db.list(`subCategoriaPorCategoriasBienes/${categoriaId}`).map(scspc =>scspc.map(scpc=>scpc.$key));
  }

 
  /**
   * scspc -> SubCategoriasPorCategoria
   * scpc  -> SubCategoriaPorCategoria
   * @param subCategoriasKeys$ las llaves de todas las subcategorias pertenecientes a una categoria
   */
  getSubCategoriasPorSubCategoriaKey(subCategoriasKeys$:Observable<string[]>):Observable<any[]>{
    return subCategoriasKeys$.map(scspc => scspc.map(key => this.db.object(`subCategoriasBienes/${key}`)))
    .flatMap(fbojs => Observable.combineLatest(fbojs));
  }

  /**
   * Retorna las subCategorias de una categoria de bienes
   * @param categoriaId $key de la categoria a la que se quiere obtener todas las subcategorias
   */
  getSubCategoriasPorCategoria(categoriaId:string):Observable<any[]>{
    return this.getSubCategoriasPorSubCategoriaKey(this.getSubCategoriasKeysPorCategoria(categoriaId));
  }


  
}

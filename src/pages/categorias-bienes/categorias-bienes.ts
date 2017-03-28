import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Observable }  from 'rxjs';
import { DonacionService } from '../../providers/donacion-service';
import { CategoriaBienes } from '../../models/categoriasBienes'; 
import { CategoriaService } from '../../providers/categoria-service';
import { SubcategoriasBienesPage } from '../subcategorias-bienes/subcategorias-bienes';

/*
  Generated class for the CategoriasBienes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categorias-bienes',
  templateUrl: 'categorias-bienes.html'
})
export class CategoriasBienesPage {

  //c//categoriasBienes$: Observable<CategoriaBienes[]>
  categoriasBienes: CategoriaBienes[];
  categoriasBienesFiltro: CategoriaBienes[];
  pregunta:string;
  perfil:string; //Donante o beneficiario
  constructor(private donacionService:DonacionService,  private categoriaService: CategoriaService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //this.categoriasBienes$ = this.categoriaService.getCategoriasBienes();
    this.categoriaService.getCategoriasBienes().subscribe(categorias =>{
      //console.log("hola categorias ", categorias);
      this.categoriasBienes = CategoriaBienes.fromjsonArray(categorias);
      this.categoriasBienesFiltro = CategoriaBienes.fromjsonArray(categorias);
    });
    this.perfil = this.navParams.get('perfil');
    switch(this.perfil){
      case 'Donante':
        this.pregunta = '¿Para que categoria?';
        break;
      case 'Beneficiario':
        this.pregunta = 'selecciona la categoria';
        break;
    }

    
  }

  initializeItems(){
    this.categoriasBienesFiltro = this.categoriasBienes;
  }

  getItems(ev:any){
    this.initializeItems();
    let val = ev.target.value;
    if(val && val.trim() !=''){
      this.categoriasBienesFiltro = this.categoriasBienesFiltro.filter(categoria=>{
        return (categoria.nombre.toLocaleLowerCase().indexOf(val.toLocaleLowerCase())> -1);
      })
    }
  }

  irSubCategorias(categoria){
    //console.log("categoria", categoria)
    if( 'Donante'  === this.perfil){
      this.donacionService.setCategoria(categoria.nombre,categoria.$key);
    }
    this.navCtrl.push(SubcategoriasBienesPage , {
      categoria: categoria.$key,
      perfil:this.perfil
    });
  }

}

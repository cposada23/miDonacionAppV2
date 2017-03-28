import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../providers/categoria-service';
import { SubCategoriaBienes } from '../../models/subCategoriaBienes';
import { AngularFire } from 'angularfire2';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { DonacionService } from '../../providers/donacion-service';
import { NuevaDonacionPage } from '../nueva-donacion/nueva-donacion';
//import { BienesPage } from '../bienes/bienes';
/*
  Generated class for the SubcategoriasBienes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-subcategorias-bienes',
  templateUrl: 'subcategorias-bienes.html'
})
export class SubcategoriasBienesPage {

  categoriaKey:string; // Llave de la categoria, para la busqueda de las subcategorias
  subcategoriasBienes:any[]; // Lista de subcategorias para la categoria dada
  subcategoriasBienesFiltro:SubCategoriaBienes[]; // Lista filtrada de subcategorias 
  perfil:string;
  pregunta:string;
  constructor(private donacionService:DonacionService, private auth: Auth, public af:AngularFire,public categoriaService:CategoriaService, public navCtrl: NavController, public navParams: NavParams) {
    this.categoriaKey = this.navParams.get('categoria'); // Obtengo la llave la categoria de la quebuscare las subcategorias
    // Se utiliza el servicio para obtener una lista de subcategorias pertenecientes a la categoria dada
    this.categoriaService.getSubCategoriasPorCategoria(this.categoriaKey).subscribe(subCategorias=>{
      console.log("hola sub categorias ........", subCategorias);
      this.subcategoriasBienesFiltro = SubCategoriaBienes.fromjsonArray(subCategorias);
      this.subcategoriasBienes = SubCategoriaBienes.fromjsonArray(subCategorias);
    });

    this.perfil = this.navParams.get('perfil');
    switch(this.perfil){
      case 'Donante':
        this.pregunta = '¿Para que sub-categoria?';
        break;
      case 'Beneficiario':
        this.pregunta = 'selecciona la sub-categoria';
        break;
    }
  }

  

  initializeItems(){
    this.subcategoriasBienesFiltro = this.subcategoriasBienes;
  }

  /**
   * 
   * @param ev evento de teclado para filtrar las subcategorias
   */
  getItems(ev:any){
    this.initializeItems(); // Se inicializan las subcategorias a ser filtradas
    let val = ev.target.value; // Se obtiene el valor de lo ingresado en la caja de busqueda
    if(val && val.trim() !=''){ // Solo se filtra cuando haya un valor diferente a vacio
      this.subcategoriasBienesFiltro = this.subcategoriasBienesFiltro.filter(subCategoria=>{
        /** se retorna las subcategorias que cumplan con el valor */
        return (subCategoria.nombre.toLocaleLowerCase().indexOf(val.toLocaleLowerCase())> -1);
      });
    }
  }

  /**
   * De acuerdo a si se esta logueado o no se le deja al usuario 
   * seguir a la pagina donde se listan los bienes.
   * @param subcategoria en la que pertenecen los bienes 
   */
  irProductos(subcategoria) {
    if(this.auth.isAutenticado()){
      //this.navCtrl.push(BienesPage);
      if('Donante' === this.perfil){
        this.donacionService.setSubCategoria(subcategoria.nombre, subcategoria.$key);
        this.navCtrl.push(NuevaDonacionPage);
      }else{
        console.log("beneficiario");
      }
    }else{
      console.log("no autenticado");
      this.navCtrl.push(LoginPage, {
        vieneSubCategoria:true
      });
    }
  }

}

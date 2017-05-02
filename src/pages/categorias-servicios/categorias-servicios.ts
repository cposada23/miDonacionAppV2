import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DonacionService } from '../../providers/donacion-service';
import { CategoriaServicio } from '../../models/categoriaServicio'; 
import { CategoriaService } from '../../providers/categoria-service';
import { DonacionesServiciosPage } from '../donaciones-servicios/donaciones-servicios';
import { NuevaDonacionServicioPage  } from '../nueva-donacion-servicio/nueva-donacion-servicio';
/*
  Generated class for the CategoriasServicios page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categorias-servicios',
  templateUrl: 'categorias-servicios.html'
})
export class CategoriasServiciosPage {
  categoriasServicios: CategoriaServicio[];
  categoriasServiciosFiltro: CategoriaServicio[];
  pregunta:string;
  perfil:string; //Donante o beneficiario
  constructor(private donacionService:DonacionService,  private categoriaService: CategoriaService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.categoriaService.getCategoriasServicios().subscribe(categorias =>{
      //console.log("hola categorias ", categorias);
      this.categoriasServicios = CategoriaServicio.fromjsonArray(categorias);
      this.categoriasServiciosFiltro = CategoriaServicio.fromjsonArray(categorias);
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
    this.categoriasServiciosFiltro = this.categoriasServicios;
  }

  getItems(ev:any){
    this.initializeItems();
    let val = ev.target.value;
    if(val && val.trim() !=''){
      this.categoriasServiciosFiltro = this.categoriasServiciosFiltro.filter(categoria=>{
        return (categoria.nombre.toLocaleLowerCase().indexOf(val.toLocaleLowerCase())> -1);
      })
    }
  }
  seleccionaCategoria(categoria) {
    console.log("categoria ", categoria);
    if( 'Donante' === this.perfil){
      console.log("es donate");
      this.donacionService.setCategoriaServicio(categoria.nombre, categoria.$key);
      this.navCtrl.push(NuevaDonacionServicioPage, {

      })
    }else {
      this.navCtrl.push(DonacionesServiciosPage, {
        categoria: categoria.$key
      });
    }
  }

}

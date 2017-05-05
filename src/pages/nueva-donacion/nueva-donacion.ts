import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { ActionSheetController } from 'ionic-angular';
import { ConfirmarDonacionPage } from '../confirmar-donacion/confirmar-donacion';
import { Utils } from '../../providers/utils';
import { DonacionService } from '../../providers/donacion-service';


/*
  Generated class for the NuevaDonacion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-nueva-donacion',
  templateUrl: 'nueva-donacion.html'
})
export class NuevaDonacionPage {
  donacion: FormGroup;
  //file:File;
  urls:Array<string>
  error: string;
  images:Array<string>;
  datosDonacion: Object;
  constructor(private donacionService:DonacionService, private utils:Utils,  private actionSheetCtrl:ActionSheetController, private imagePicker:ImagePicker, private formBuilder:FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
 
    this.donacion = this.formBuilder.group({
      titulo:['', Validators.required],
      descripcion: ['', Validators.required],
      estado:['',Validators.required]
    });

    this.datosDonacion = this.donacionService.getDonacion();
  }

  ionViewDidLoad() {}

  openGallery():void{
    let options: ImagePickerOptions = {
      maximumImagesCount:3,
      width:500,
      height:500,
      quality: 75
    }
    this.imagePicker.getPictures(options).then((resutls)=>{
      this.images = resutls;
    },(error)=>{
      this.error = error;
    });
  }

  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Agrega imagenes',
      cssClass:'action-sheets-basic-page', 
      buttons:[
        {
          text:'Camara',
          icon:'camera',
          handler: () => {
            console.log("camera clicked");
          }
        },{
          text:'Galeria',
          icon:'photos',
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]

    });
    actionSheet.present();
  }

  

  continuar(){
    //alert('undi continuar');
    if(this.images) {
      const donacionValue = this.donacion.value;
      this.donacionService.setDonacion(donacionValue.titulo, donacionValue.descripcion, donacionValue.estado);
      this.navCtrl.push(ConfirmarDonacionPage, {
        imagenes: this.images
      });
    }else {
      alert('Agrega almenos una imagen');
    }
    // const donacionValue = this.donacion.value;
    // this.donacionService.setDonacion(donacionValue.titulo, donacionValue.descripcion, donacionValue.estado);
    // this.navCtrl.push(ConfirmarDonacionPage, {
    //   imagenes: this.images
    // });

    

  }



}

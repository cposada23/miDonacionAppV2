import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { ActionSheetController } from 'ionic-angular';

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
  file:File;
  urls:Array<string>
  error: string;
  images:Array<string>;
  constructor(private actionSheetCtrl:ActionSheetController, private imagePicker:ImagePicker, private formBuilder:FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.donacion = this.formBuilder.group({
      titulo:['', Validators.required],
      descripcion: ['', Validators.required],
      estado:['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaDonacionPage');
  }

  openGallery():void{
    let options: ImagePickerOptions = {
      maximumImagesCount:3,
      width:500,
      height:500,
      quality: 75
    }

    this.imagePicker.getPictures(options).then((resutls)=>{
      //this.dio = resutls[0];
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

  onChange(event){
    console.log(event.srcElement.files);
    this.file = event.srcElement.files[0];
    //console.log("this.file", this.file);
    //this.nombreArchivo = this.file.name;


    /*if(this.file.size>this.maxSize){
      console.log("el archivo exede el tamaño maximo de 5 Megabytes");
      this.showPrompt('El archivo seleccionado excede el tamaño máximo de 5 Megabytes', 0);
      this.file = null;
      this.nombreArchivo = "";
    }*/
    

  }

  continuar(){
    const donacionValue = this.donacion.value;
    console.log("formValue", donacionValue);
  }



}

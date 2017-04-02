import { Component, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { ActionSheetController } from 'ionic-angular';
import { FirebaseRef } from 'angularfire2/index'
import { File} from '@ionic-native/file';
import { Utils } from '../../providers/utils';


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
  storage: any;
  constructor(private utils:Utils, private filePlugin: File,@Inject(FirebaseRef) fb, private actionSheetCtrl:ActionSheetController, private imagePicker:ImagePicker, private formBuilder:FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.storage = fb.storage().ref();
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
      this.images = resutls;
    },(error)=>{
      this.error = error;
    });
  }

  

  upload(){
    const url = this.images[0];
    alert(url);
    this.utils.getBlobFromUrl(url).then((blob) => {
      alert('blob success');
      try {
      let uploadTask = this.storage.child('images').put(blob);
      uploadTask.on('state_changed', 
        (snapshot)=>{
          this.error = 'subiendo';
        },
        (error) =>{
          alert(error);
        },
        () => {
          alert('success');
        }
      )}catch (error) {
        alert(error);
      }
    }).catch((error) => {
      alert(error);
    });
    
    /*this.filePlugin.resolveLocalFilesystemUrl(url).then((res:any) => {
      alert(res.isFile);
      res.file((resFile) => {
        alert(resFile);
        var reader = new FileReader();
        reader.onloadend = (evt:any) => {
          var imgBlob:any = new Blob([evt.target.result], {type: 'image/jpeg'});
          imgBlob.name = 'ejemplo.jpg';
          alert(typeof(imgBlob));

          try {
            let uploadTask = this.storage.child('images').put(imgBlob);
            uploadTask.on('state_changed', 
              (snapshot)=>{
                this.error = 'subiendo';
              },
              (error) =>{
                alert(error);
              },
              () => {
                alert('success');
              }
            )
          }catch (error) {
            alert(error);
          }


        }
        reader.onerror = (e) => {
          alert(e.toString());
        }
        reader.readAsArrayBuffer(resFile);
      });
      
      
    
    });*/
    /*(<any>window).resolveLocalFileSystemURL(url, (res) => {
      alert("entra a esto");
      res.file((resFile) => {
        var reader = new FileReader();
        reader.readAsArrayBuffer(resFile);
        reader.onloadend = (evt: any) => {
          var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
          var imageStore = this.storage.child('image');
          imageStore.put(imgBlob).then((res) => {
            alert('Upload Success');
          }).catch((err) => {
            alert('Upload Failed' + err);
          })
        }
      })
    })*/
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
    //console.log(event.srcElement.files);
    const url = 'file:///data/dalk/com.uiioa.okajsdf.kafjsf/cache/nomkasjdfhksajdfbre.jpg';
    const nombre = url.split('/').pop();
    console.log("nombre", nombre);

    /*let file:Array<File> = new Array<File>();  
    file[0]= event.srcElement.files[0];
    file[1]= event.srcElement.files[0];
    file[2]= event.srcElement.files[0];
    file.forEach((file) => {
      console.log("file", file);
      let i = Math.random();
      let uploadTask = this.storage.child('images/'+ i.toString()).put(file);
      uploadTask.on('state_changed', 
        (snapshot)=>{
          console.log("subiendo" + i.toString);
          this.error = 'subiendo';
        },
        (error) =>{
          alert(error);
        },
        () => {
          alert('success');
        }
      );
    });*/
    
    //this.file = event.srcElement.files[0];
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

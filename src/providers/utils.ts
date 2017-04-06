import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { File } from '@ionic-native/file';
import 'rxjs/add/operator/map';

/*
  Generated class for the Utils provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Utils {

  constructor(private filePlugin:File, public http: Http) {}


  getBlobFromUrl(url:string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.filePlugin.resolveLocalFilesystemUrl(url).then((res:any) => {
        //alert(res.isFile);
        res.file((resFile) => {
          //alert(resFile);
          var reader = new FileReader();
          reader.onloadend = (evt:any) => {
            var imgBlob:any = new Blob([evt.target.result], {type: 'image/jpeg'});
            imgBlob.name = 'ejemplo.jpg';
            //alert(typeof(imgBlob));
            resolve(imgBlob);
          }
          reader.onerror = (e) => {
            reject(e)
            alert(e.toString());
          }
          reader.readAsArrayBuffer(resFile);
        });
      }).catch(error => {
        alert(error);
        reject(error);
      });
    });
  }

}

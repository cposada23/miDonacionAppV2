import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

/** Ionic native  */
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
/**https://github.com/Riron/ionic-img-viewer */
import { IonicImageViewerModule } from 'ionic-img-viewer';

/** tabs */
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { PerfilPage } from '../pages/perfil/perfil';

/**categorias Bienes */
import { CategoriasBienesPage } from '../pages/categorias-bienes/categorias-bienes';
import { SubcategoriasBienesPage } from '../pages/subcategorias-bienes/subcategorias-bienes';

/**Categorias servicios */
import { CategoriasServiciosPage } from '../pages/categorias-servicios/categorias-servicios'; 

/** Nueva donacion */
import { NuevaDonacionPage } from '../pages/nueva-donacion/nueva-donacion';
import { ConfirmarDonacionPage } from '../pages/confirmar-donacion/confirmar-donacion';
import { NuevaDonacionServicioPage } from '../pages/nueva-donacion-servicio/nueva-donacion-servicio'; 
/**Donaciones */
import { MisDonacionesPage } from '../pages/mis-donaciones/mis-donaciones';
import { MisDonacionesBienesPage }  from '../pages/mis-donaciones-bienes/mis-donaciones-bienes';
import { DonacionesBienesPage } from '../pages/donaciones-bienes/donaciones-bienes';
import { DonacionesServiciosPage } from '../pages/donaciones-servicios/donaciones-servicios';

/** Contacto */
import { ContactoBienesPage } from '../pages/contacto-bienes/contacto-bienes';
import { ContactosPorDonacionBienesPage } from '../pages/contactos-por-donacion-bienes/contactos-por-donacion-bienes';
import { DetalleContactoBienesPage } from '../pages/detalle-contacto-bienes/detalle-contacto-bienes';
import { ContactosHechosPage } from '../pages/contactos-hechos/contactos-hechos'; 

import { MisDonacionesServiciosPage } from '../pages/mis-donaciones-servicios/mis-donaciones-servicios'; 
import { PreguntaPage }  from '../pages/pregunta/pregunta';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/** Firebase */
import {firebaseConfig, authConfig} from '../firebase/firebase.config'; 
import { AngularFireModule } from 'angularfire2/index'; 

/** login y registro */
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';

/** Servicios */
  /** Autenticación */
  import { Auth } from '../providers/auth';
  /**Categorias y subcategorias */
  import { CategoriaService } from '../providers/categoria-service';
  /**Donaciones */
  import { DonacionService } from '../providers/donacion-service';
  /** Utils */
  import { Utils } from '../providers/utils';
 

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistroPage,
    NotificacionesPage,
    PerfilPage,
    PreguntaPage,
    CategoriasBienesPage,
    SubcategoriasBienesPage,
    NuevaDonacionPage,
    ConfirmarDonacionPage,
    MisDonacionesPage,
    MisDonacionesBienesPage,
    DonacionesBienesPage,
    MisDonacionesServiciosPage,
    CategoriasServiciosPage,
    DonacionesServiciosPage,
    NuevaDonacionServicioPage,
    ContactoBienesPage,
    ContactosPorDonacionBienesPage,
    DetalleContactoBienesPage,
    ContactosHechosPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistroPage,
    NotificacionesPage,
    PerfilPage,
    PreguntaPage,
    CategoriasBienesPage,
    SubcategoriasBienesPage,
    NuevaDonacionPage,
    ConfirmarDonacionPage,
    MisDonacionesPage,
    MisDonacionesBienesPage,
    DonacionesBienesPage,
    MisDonacionesServiciosPage,
    CategoriasServiciosPage,
    DonacionesServiciosPage,
    NuevaDonacionServicioPage,
    ContactoBienesPage,
    ContactosPorDonacionBienesPage,
    DetalleContactoBienesPage,
    ContactosHechosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Auth,
    CategoriaService,
    DonacionService,
    ImagePicker,
    File,
    Utils
  ]
})
export class AppModule {}

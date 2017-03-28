import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';


/** tabs */
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { PerfilPage } from '../pages/perfil/perfil';

/**categorias Bienes */
import { CategoriasBienesPage } from '../pages/categorias-bienes/categorias-bienes';
import { SubcategoriasBienesPage } from '../pages/subcategorias-bienes/subcategorias-bienes';

/** Nueva donacion */
import { NuevaDonacionPage } from '../pages/nueva-donacion/nueva-donacion';

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
    NuevaDonacionPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
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
    NuevaDonacionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Auth,
    CategoriaService,
    DonacionService
  ]
})
export class AppModule {}

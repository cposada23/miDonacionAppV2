import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFire } from 'angularfire2';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(private af:AngularFire, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let subscriber = this.af.auth.subscribe(auth => {
        if(auth){
          this.rootPage = TabsPage;
        }else{
          this.rootPage = HomePage;
        }
        subscriber.unsubscribe();
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

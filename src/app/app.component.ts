import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserProvider } from '../providers/user/user';
import { AddUserPage } from '../pages/add-user/add-user';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(NavController) navCtrl : NavController;
  rootPage:any = LoginPage;

  constructor(public platform: Platform, public statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthServiceProvider, public menu : MenuController, public userProvider : UserProvider) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  
    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.userProvider.getUser(user.uid, data => {
              if(data){
                this.rootPage = HomePage;
              }else{
                this.rootPage = AddUserPage;
              }
            })
          } else {
            this.rootPage = LoginPage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );
  }

  login(){
    this.menu.close();
    this.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  logout() {
    this.menu.close();
    this.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }
}

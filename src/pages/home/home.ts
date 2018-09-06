import { Component } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider, public menu : MenuController) {

  }

  logout() {
    this.menu.close();
    this.auth.signOut();
  }

}

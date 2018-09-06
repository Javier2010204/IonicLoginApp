import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loginError : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private auth : AuthServiceProvider) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let data = this.loginForm.value;

    if(!data.email){
      return;
    }

    let credentials = {
      email : data.email,
      password : data.password
    };

    this.auth.signInWithEmail(credentials)
                            .then(
                              () => this.navCtrl.setRoot(HomePage),
                              error => this.loginError = error.message
                            )
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }

  loginWithGoogle() {
    this.auth.googleLogin();
  }

}

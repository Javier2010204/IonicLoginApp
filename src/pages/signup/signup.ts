import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupError : string;
  form : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private auth: AuthServiceProvider) {
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    let data = this.form.value;
    let credentials = {
      email: data.email,
      password: data.password
    };

    this.auth.signup(credentials).then(
      () => this.navCtrl.setRoot(HomePage),
      error => this.signupError = error.message
    )
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../models/user/user.interface';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the AddUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {

  user = {} as User;
  createAccountForm : FormGroup;
  file;
  img;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth : AuthServiceProvider, fb : FormBuilder, private userProvider : UserProvider ) {
    this.createAccountForm = fb.group({
      name: ['', Validators.required],
      photoUrl: ['']
    });
    this.auth.afAuth.authState.subscribe(
      user => {
        if (user) {
          this.user.email = user.email;
          this.user.key = user.uid;
          if(user.photoURL){
            this.user.photoUrl = user.photoURL;
            console.log(this.user.photoUrl);
          }
        }
      }
    );
  }

  createAccont(){
    this.userProvider.uploadFile(this.file, this.user.key, data => {
      this.user.photoUrl = data;
      console.log(this.createAccountForm);
      this.user.name = this.createAccountForm.value.name;
      this.userProvider.addUser(this.user);
    })
  }

  fileChange(event){
    console.log(event);
    this.file = event.target.files[0];
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();
      reader.onload = (event:any) => {
         this.img =event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}

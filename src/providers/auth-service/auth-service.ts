import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  user : any;

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
    })
  }

  signInWithEmail(credentials){
    console.log('Registro con credenciales');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  loginWithGoogle(){
    console.log('Login con Google');
  }

  signup(credentials){
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  get authenticated() : boolean{
    return this.user !== null;
  }

  getEmail(){
    return this.user && this.user.email;
  }

  signOut() : Promise<void>{
    return this.afAuth.auth.signOut();
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
          this.user = credential.user
          console.log(this.user);
      })
      .catch(error => console.log(error));
  }


  
}

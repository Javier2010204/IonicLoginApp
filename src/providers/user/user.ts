import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { resolveDefinition } from '@angular/core/src/view/util';
import { User } from '../../models/user/user.interface';
import { AngularFireStorage } from 'angularfire2/storage';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(private db : AngularFireDatabase, private storage: AngularFireStorage) {
    console.log('Hello UserProvider Provider');
  }

  getUser(uid, resolve){
    this.db.object('user/' + uid).snapshotChanges().subscribe(action => {
      resolve(action.payload.val());
    })
  }

  addUser(user : User){
    const userRef = this.db.list('user');

    userRef.set(user.key, user).then( () => {
      return 'agregado!';
    });
  }

  uploadFile(file, key, resolve){
    const fileRef = this.storage.ref("profile/"+key+".jpg");
    this.storage.upload("profile/"+key+".jpg", file).then(data => {
      fileRef.getDownloadURL().subscribe(url=>{
        console.log(url);
        resolve('url');
      });
    },err => {
      console.log(err);
    })
  }

}

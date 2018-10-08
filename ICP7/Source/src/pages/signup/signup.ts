import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import { MainPage } from '../';
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  user = {} as User;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth) {

  }
  async doSignup(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot('TabsPage');
      }
    }
    catch (e) {
      console.error(e);
    }
  }
}

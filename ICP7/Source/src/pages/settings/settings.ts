import { Component } from '@angular/core';
import {IonicPage, NavController,ToastController} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";
import {GooglePlus} from "@ionic-native/google-plus";
import {LoginPage} from "../login/login";
import {AngularFireAuth} from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  userData = [];
  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage, public googlePlus: GooglePlus,
              private afAuth: AngularFireAuth, private toast: ToastController) {
    this.afAuth.authState.subscribe(data =>{
      // @ts-ignore
      this.userData = Array.of(data);
      console.log(this.userData);
    });
  }
  // ionViewWillLoad() {
  //   this.afAuth.authState.subscribe(data =>{
  //     if(data && data.email && data.uid) {
  //       this.toast.create({
  //         message: "Welcome to DealSuperior",
  //         duration: 3000
  //       }).present();
  //     }
  //     else {
  //       this.toast.create({
  //         message: 'Could not find authentication details',
  //         duration: 3000
  //       }).present();
  //     }
  //   });
  // }
  signinp() {
    this.navCtrl.push('LoginPage');
  }

  doGoogleLogout(){
    let nav = this.navCtrl;
    let env = this;
    this.googlePlus.logout()
      .then(function (response) {
        env.nativeStorage.remove('user');
        nav.push(LoginPage);
      },function (error) {
        console.log(error);
      })
  }




}

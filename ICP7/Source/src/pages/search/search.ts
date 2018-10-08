import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController,} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";
import {GooglePlus} from "@ionic-native/google-plus";
import {AngularFireAuth} from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage, public googlePlus: GooglePlus,
              private afAuth: AngularFireAuth, private toast: ToastController) {
  }
  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid) {
        this.toast.create({
          message: "Welcome to DealSuperior",
          duration: 1000
        }).present();
      }
      else {
        this.toast.create({
          message: 'Could not find authentication details',
          duration: 1000
        }).present();
      }
    });
  }

}

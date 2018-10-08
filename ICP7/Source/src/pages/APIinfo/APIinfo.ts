import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the APIInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-APIinfo',
  templateUrl: 'APIinfo.html',
})
export class APIInfoPage {

  movie: {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.movie = navParams.get('movie');
  }

}

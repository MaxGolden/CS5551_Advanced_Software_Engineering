import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import { MovieService } from "../../services/rest/movie-service";
import { APIInfoPage } from "../APIinfo/APIinfo";
import {ItemCreatePage} from "../item-create/item-create";

// @ts-ignore
@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  movies: Array<any>;

  constructor(public navCtrl: NavController, private movieService: MovieService) {
    // // @ts-ignore
    // this.movies=this.httpClient.get('http://api.walmartlabs.com/v1/search?apiKey=vwtzj6yrpv53yrp62squshbm&lsPublisherId={Your%20LinkShare%20Publisher%20Id}&query=').
  }
  Pictake1() {
    this.navCtrl.push(ItemCreatePage)
  }
  searchForMovie(event, key) {
    if(event.target.value.length > 2) {
      this.movieService.searchMovies(event.target.value).subscribe(
        data => {
          this.movies = data.items;
          // this.movies = data.items;
          console.log(data);
        },
        err => {
          console.log(err);
        },
        () => console.log('Product Search Complete')
      );
    }
  }

  selectMovie(event, movie) {
    console.log(movie);
    this.navCtrl.push(APIInfoPage, {
      movie: movie
    });
  }

}

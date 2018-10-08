import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MovieService {
  data: Observable<any>;
  constructor(private http:HttpClient) {
  }
  searchMovies(movieName) {
    // var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var url = 'http://api.walmartlabs.com/v1/search?apiKey=vwtzj6yrpv53yrp62squshbm&lsPublisherId={Your%20LinkShare%20Publisher%20Id}&query='+encodeURI(movieName);
    // var response = this.http.get(url).map(ite => ite.json());
    this.data = this.http.get(url).map(ite => (<any>ite));
    var response = this.data;
    return response;
  }
}

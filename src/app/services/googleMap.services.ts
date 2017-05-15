import { Injectable } from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/RX';

@Injectable()
export class GoogleMapServices {

  private url:String = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";

  constructor (private http:Http){}

  getAddressFromLatLng(lat, lng){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions ({ headers: headers });
    return this.http.get(this.url+lat+","+lng).map(
      (response:Response) => {
        const data = response.json();
        return data;
      }
    );
  }

}

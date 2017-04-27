import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController } from 'ionic-angular';
import { Home } from "../home/home.component";
import {AppShipmentService} from "../../app/services/appShipment.service";

@Component({
    templateUrl: 'login.html'
})
export class Login {

    loginData = {
        username:"",
        password:""
    };

    constructor(private http:Http, private navCtrl: NavController, private appShipmentService: AppShipmentService) {
      this.loginData.username = "fizz@seajoker.com";
      this.loginData.password = "fizz";
    }

    login(){

      this.appShipmentService.login();
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions ({ headers: headers });
      var url = "http://localhost:9000/login";
      console.log("Connecting...");
      this.http.post(url,this.loginData, options).subscribe(
        res => {
          if (res.ok) {
            console.log("Valid Credentials!!, sending to home");
            this.navCtrl.setRoot(Home);
          }
        },
        err => {
          if (err.status == 401){
            console.log("Invañid Credentials!");
          }
        }
      );
    }
}

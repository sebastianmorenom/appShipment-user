import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController } from 'ionic-angular';
import { Maps } from "../maps/maps.component";

@Component({
    templateUrl: 'login.html'
})
export class Login {

    loginData = {
        username:"",
        password:""
    };

    constructor(private http:Http, private navCtrl: NavController) {
      this.loginData.username = "fizz@seajoker.com";
      this.loginData.password = "fizz";
    }

    login(){
      let headers      = new Headers({ 'Content-Type': 'application/json' });
      let options       = new RequestOptions ({ headers: headers });
      var url = "http://localhost:9000/login";
      console.log("Connecting...");
      this.http.post(url,this.loginData, options).subscribe(
        res => {
          console.log(res);
          if (res.ok) {
            console.log("Valid Credentials!!, sending to home");
            this.navCtrl.setRoot(Maps);
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

import { Component } from '@angular/core';
import { Http } from '@angular/http';
import {AlertController, NavController} from 'ionic-angular';
import { AppShipmentService } from "../../app/services/appShipment.service";
import {Home} from "../home/home.component";

@Component({
    templateUrl: 'login.html'
})
export class Login {
  loading:boolean;
  loginData = {
      username:"",
      password:""
  };

  constructor(private http:Http, private navCtrl: NavController, private appShipmentService: AppShipmentService,
              private alertCtrl: AlertController) {
    this.loginData.username = "fizz@seajoker.com";
    this.loginData.password = "fizz";
    this.loading = false;
  }

  login(){
    this.loading = true;
    this.appShipmentService.login(this.loginData).subscribe(
      (data:any) => {
        this.loading = false;
        this.navCtrl.setRoot(Home, {user:data})
      },
      (error:any) => {
        this.loading = false;
        this.presentAlertError(error);
        console.log(error.body)
      },
      () => {
        this.loading = false;
      }
    );
  }

  presentAlertError(error) {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: error,
      buttons: ['OK']
    });
    alert.present();
  }
}

import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Home} from "../home/home.component";

@Component({
  templateUrl: 'rate.html'
})
export class RateService {
  activeService:any;
  user:any;
  iconTrans:any;
  constructor(private navParams:NavParams, private navCtrl: NavController){
    this.iconTrans = {url: '/assets/icon/car.png'};
    this.activeService = this.navParams.get('activeService');
    this.user = this.navParams.get('user');
  }

  goHome(){
    this.navCtrl.setRoot(Home, {user:this.user});
  }

}

import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

@Component({
  templateUrl: 'rate.html'
})
export class RateService {
  activeService:any;
  iconTrans:any;
  constructor(private navParams:NavParams, private navCtrl: NavController){
    this.iconTrans = {url: '/assets/icon/car.png'};
    this.activeService = this.navParams.get('activeService');
  }
}

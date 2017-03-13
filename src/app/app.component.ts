import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Accelerometer } from "../pages/accelerometer/accelerometer.component";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = Accelerometer;

  constructor(private platform: Platform) {
    this.platform = platform;
  }
}

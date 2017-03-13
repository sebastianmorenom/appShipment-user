import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Maps } from "../pages/maps/maps.component";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = Maps;

  constructor(private platform: Platform) {
    this.platform = platform;
  }
}

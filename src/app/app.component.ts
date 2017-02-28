import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import {Login} from "../pages/login/login";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = Login;

  constructor(platform: Platform) {

  }
}

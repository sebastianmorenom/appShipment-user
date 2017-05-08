import {Component} from "@angular/core";

@Component({
  templateUrl: 'createService.html'
})
export class CreateService {
  dimensiones:any;
  constructor(){
    this.dimensiones = ['light', 'dark', 'light']
  }
}

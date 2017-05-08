import {Component} from "@angular/core";

@Component({
  templateUrl: 'createService.html'
})
export class CreateService {
  dimensiones:any;
  currentDimension:number;

  constructor(){
    this.dimensiones = ['light', 'primary', 'light']
    this.currentDimension = 1;
  }

  selectDimention(id:number){
    this.dimensiones[id] = 'primary';
    this.dimensiones[this.currentDimension] = 'light';
    this.currentDimension = id;
  }

}

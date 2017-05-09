import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavParams} from "ionic-angular";

@Component({
  templateUrl: 'createService.html'
})
export class CreateService {
  dimensiones:any;
  currentDimension:number;
  formCreateService:FormGroup;
  submitAttempt:boolean;
  user:any;

  constructor(private formBuilder:FormBuilder, private navParams:NavParams){
    this.submitAttempt = false;
    this.dimensiones = ['light', 'primary', 'light'];
    this.currentDimension = 1;
    this.formCreateService = formBuilder.group({
      toLocation: ['', Validators.compose([Validators.required])],
      toName: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      contentDeclaration: ['', Validators.compose([Validators.required, Validators.maxLength(120)])],
      valueDeclaration: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])],
      dimension: [this.currentDimension, Validators.compose([Validators.required, Validators.pattern("^[0-9]$")])]
    });
    this.user = this.navParams.get('user');
  }

  selectDimension(id:number){
    this.dimensiones[id] = 'primary';
    this.dimensiones[this.currentDimension] = 'light';
    this.currentDimension = id;
    this.formCreateService.value.dimension = id;
  }

  createService(){
    this.submitAttempt=true;
    if(!this.formCreateService.valid){
      alert("Los campos tienen que ser diligenciados correctamente.")
    }
    else {
      alert("Creating service!");
      this.formCreateService.value.user = this.user;
      console.log(this.formCreateService.value);
    }
  }

}

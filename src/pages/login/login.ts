import { Component } from '@angular/core';
import {Http} from '@angular/http';

@Component({
    templateUrl: 'login.html'
})
export class Login {

    loginData = {
        username:"",
        password:""
    };

    constructor(private http:Http) {
    }

    login(){
        /*alert("trying to login with credentials: \n " +
          "Username: "+ this.loginData.username +"\n" +
          "Password: "+ this.loginData.password);*/
        var url = "http://54.226.49.241:9000/login/"+this.loginData.username;
        this.http.get(url).subscribe(
          res => console.log(res.json())
        );
    }
}

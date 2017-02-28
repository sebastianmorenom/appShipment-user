import { Component } from '@angular/core';

@Component({
    templateUrl: 'login.html'
})
export class Login {

    loginData = {
        username:"",
        password:""
    };

    constructor() {
    }

    login(){
        alert("trying to login with credentials: \n " +
          "Username: "+ this.loginData.username +"\n" +
          "Password: "+ this.loginData.password);
    }
}

import {Component} from "@angular/core";
import {DeviceMotion} from 'ionic-native';
@Component({
  templateUrl: 'accelerometer.html',
})
export class Accelerometer{
	x:string;
	y:string;
	z:string;

	constructor(){
		this.x = "prueba";
	}
		getAcceleration(){
			navigator.accelerometer.getCurrentAcceleration(this.onSuccess, this.onError);	
		}	

	onSuccess(acceleration){
	    		console.log('Acceleration X: ' + acceleration.x + '\n' +
	          	'Acceleration Y: ' + acceleration.y + '\n' +
	          	'Acceleration Z: ' + acceleration.z + '\n' +
	          	'Timestamp: '      + acceleration.timestamp + '\n');
	          	console.log(this+"el");
	    		this.x = acceleration.x;
	    		this.y = acceleration.y;
	    		this.z = acceleration.z;
	}
	onError() {
    		alert('onError!');
	}

}





import {Component, ViewChild} from "@angular/core";
import { NavController } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData } from 'ionic-native';
@Component({
  templateUrl: 'accelerometer.html',
})
export class Accelerometer{
	accelerometer: any;
	axisX:any;
	axisY:any;
	axisZ:any;

	constructor(public navCtrl: NavController){
		this.axisX = 0;
		this.axisY = 0;
		this.axisZ = 0;
	}
	getAcceleration(){		
			DeviceMotion.getCurrentAcceleration().then(
			  (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
			  (error: any) => console.log(error)
			);

			// Watch device acceleration
			var options = { frequency: 1000 };  // Update every 3 seconds
			var subscription = DeviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
			  console.log(acceleration);
			});

			
	}

}






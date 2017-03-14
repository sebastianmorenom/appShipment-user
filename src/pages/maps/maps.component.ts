import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  templateUrl: 'maps.html',
})
export class Maps implements OnInit{

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markerOrigen: any;
  markerDestino: any;
  directionsService: any;
  directionsRender: any;
  directionsResult: any;
  directionsStatus: any;
  enableDirections: boolean;

  constructor(public navCtrl: NavController) {
    this.enableDirections=true;
    this.markerOrigen = null;
    this.markerDestino = null;
  }

  ngOnInit(){
    this.loadMap();
  }

  loadMap(){

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRender = new google.maps.DirectionsRenderer();
    Geolocation.getCurrentPosition().then(
      (position) => {
        let centerMap = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: centerMap,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.addMarkerWithPos(1, centerMap);
        this.map.addListener('click', (event)=>{
          console.log(event);
        });

      },
      (err) => {
        console.log(err);
      }
    );
  };

  addMarkerCenterMap(opt){
    if( opt === 1 ){
      if(this.markerOrigen){
        this.markerOrigen.setMap(null);
      }
      this.markerOrigen = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter(),
        icon: './'
      });
    }
    if( opt === 2 ){
      if(this.markerDestino){
        this.markerDestino.setMap(null);
      }
      this.markerDestino = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });
    }
  }

  addMarkerWithPos(opt, pos){

    if( opt === 1 ){
      if(this.markerOrigen){
        this.markerOrigen.setMap(null);
      }
      this.markerOrigen = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: pos
      });
    }
    if( opt === 2 ){
      if(this.markerDestino){
        this.markerDestino.setMap(null);
      }
      this.markerDestino = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: pos
      });
    }
  };

  getDirections(){
    console.log("getting directions!");
    var request = {
      origin:this.markerOrigen.position,
      destination:this.markerDestino.position,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    this.directionsService.route(request, (response, status)=>{
      this.directionsResult = response;
      this.directionsStatus = status;
      this.printDirections()
    });
  };

  printDirections(){
    if (this.directionsStatus === "OK"){
      this.markerOrigen.setMap(null);
      this.markerDestino.setMap(null);
      this.directionsRender.setMap(this.map);
      this.directionsRender.setDirections(this.directionsResult);
    }
    else {
      alert("Cant retrieve routes");
    }
  };

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
}

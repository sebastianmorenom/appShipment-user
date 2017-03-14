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
  iconUserDetail:any;
  iconTransDetail:any;

  info:any;

  constructor(public navCtrl: NavController) {
    this.enableDirections=true;
    this.markerOrigen = null;
    this.markerDestino = null;
    this.iconUserDetail = {
      url: '../assets/icon/userPos.png'
    };
    this.iconTransDetail = {
      url: '../assets/icon/carPos.png'
    };
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
        this.addMarkerCenterMap(1);
        this.map.addListener('click', (event)=>{
          this.addMarkerWithPos(1, event.latLng);
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
      this.markerOrigen = this.putMarker(this.map, this.markerOrigen, this.map.getCenter(), this.iconUserDetail);
    }
    if( opt === 2 ){
      if(this.markerDestino){
        this.markerDestino.setMap(null);
      }
      this.markerDestino = this.putMarker(this.map, this.markerDestino, this.map.getCenter(), this.iconTransDetail);
    }
  }

  addMarkerWithPos(opt, pos){

    if( opt === 1 ){
      if(this.markerOrigen){
        this.markerOrigen.setMap(null);
      }
      this.markerOrigen = this.putMarker(this.map, this.markerOrigen, pos, this.iconUserDetail);
    }
    if( opt === 2 ){
      if(this.markerDestino){
        this.markerDestino.setMap(null);
      }
      this.markerDestino = this.putMarker(this.map, this.markerDestino, pos, this.iconTransDetail);
    }
  };

  putMarker(map, marker, pos, iconDetail){
    this.directionsRender.set('directions', null);
    marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: pos,
      icon: iconDetail
    });
    marker.addListener('click', ()=>{
      console.log(marker);
    });
    return marker;
  }

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

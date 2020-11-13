import { Component, OnInit, ViewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.page.html',
  styleUrls: ['./test1.page.scss'],
})

export class Test1Page implements OnInit {
 
  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
   
  }
  
  ionViewDidEnter(){

    let lat;
    let long;
    let map: mapboxgl.Map;
    
    this.geolocation.getCurrentPosition().then((resp) => {
      lat= resp.coords.latitude
      long = resp.coords.longitude
      mapboxgl.accessToken = 'pk.eyJ1IjoicnlqdDk5IiwiYSI6ImNraGZnZXo5NDBia2YycW53MzdhdmFraG4ifQ.1yMt9nEj2VASFPG-H3U2sA';
      map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [long, lat], // starting position [lng, lat]
      zoom: 9 // starting zoom
      
      });
      var marker = new mapboxgl.Marker().setLngLat([long, lat]).setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML('<p style="color:black;">You are here!<p>')).addTo(map);
      
     
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     
    
  }

}

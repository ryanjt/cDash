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
      let url = 'https://edinburghcouncilmaps.info/arcgis/rest/services/Misc/INSPIRE/MapServer/27/query?where=1%3D1&outFields=NATURALCOM,Shape&outSR=4326&f=json';
      var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [long, lat], // starting position [lng, lat]
      zoom: 11.15 // starting zoom
      
      });
      map.on('load', function () {
        map.addSource('national-park', {
       type: 'geojson',
       data: 'https://api.jsonbin.io/b/5fb2e65bdedba573f2223ee1'
     });
     map.addLayer({
     'id': 'park-boundary',
     'type': 'fill',
     'source': 'national-park',
     
     'paint': {
      'fill-color': [
        "case", 
        ['==', ['get', "levels"], 1], "#e55e5e", 
        ['==', ['get', "user_levels"], "Medium"], "#fd8c00",
        ['==', ['get', "user_levels"], "Low"], "#fdc500",
        
        '#00ac46'
      ],
     'fill-opacity': 0.8,
     'fill-outline-color': 'rgba(200,0,0,1)'
     
     },
     'area-color': [
      'match',
      ['get', 'national-park'],
      'Low',
      '#fdc500',
      'Medium',
      '#fd8c00',
      'High',
      '#e55e5e',
      'Normal',
      '#00ac46',
      
      /* other */ '#ccc'
      ]
     });
    });
     
      var marker = new mapboxgl.Marker().setLngLat([long, lat]).setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML('<p style="color:black;">You are here!<p>')).addTo(map);
      
     
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     
    
  }

}

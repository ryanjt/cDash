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
      mapboxgl.accessToken = 'token';
      let url = 'https://edinburghcouncilmaps.info/arcgis/rest/services/Misc/INSPIRE/MapServer/27/query?where=1%3D1&outFields=NATURALCOM,Shape&outSR=4326&f=json';
      var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [long, lat], // starting position [lng, lat]
      zoom: 11.15 // starting zoom
      
      });
      map.on('load', function () {
        map.addSource('regions', {
       type: 'geojson',
       data: 'https://ryanjt.github.io/cDash/data.json'
     });
     map.addLayer({
     'id': 'park-boundary',
     'type': 'fill',
     'source': 'regions',
     
     'paint': {
      'fill-color': [
        'match',
        ['get', 'levels'],
        'Low',
        '#fdc500',
        'Medium',
        '#fd8c00',
        'High',
        '#e55e5e',
  
        
        /* other */ '#00ac46'
        ],
     'fill-outline-color': 'black',
     'fill-opacity': 0.8,
     
     
     
     },

     
     
     });
     map.on('click', 'park-boundary', function (e) {
      new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML("<h4 style='color:black;'>" + e.features[0].properties.area + "</h4><p style='color:black;'> Cases: " + e.features[0].properties.cases + "</p>")
      .addTo(map);
      
      });
 
    });
     
      var marker = new mapboxgl.Marker().setLngLat([long, lat]).setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML('<p style="color:black;">You are here!<p>')).addTo(map);
      
     
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     
    
  }

}

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import * as moment from 'moment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.page.html',
  styleUrls: ['./main-stats.page.scss'],
})
export class MainStatsPage implements OnInit {

  @ViewChild("barCanvas", { static: true }) barCanvas: ElementRef;
  @ViewChild("lineCanvas", { static: true }) lineCanvas: ElementRef;
  @ViewChild("doughnutCanvas", { static: true }) doughnutCanvas: ElementRef;
  @ViewChild("text1") textLabel;   
  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;
  private data1: any;
  constructor(public toastController: ToastController) {}
  


ngOnInit() {
    

  fetch('https://cors-anywhere.herokuapp.com/https://www.opendata.nhs.scot/api/3/action/datastore_search?q=Scotland&resource_id=7fad90e5-6f19-455b-bc07-694a22f8d5dc').then(res => res.json())
  .then(json => {
    var backgroundColor = ["RGBA(230, 25, 75,0.5)", "RGBA(60, 180, 75,0.5)", "RGBA(255, 225, 25,0.5)", "RGBA(0, 130, 200,0.5)", "RGBA(245, 130, 48,0.5)", "RGBA(145, 30, 180,0.5)", "RGBA(70, 240, 240,0.5)", "RGBA(240, 50, 230,0.5)", "RGBA(210, 245, 60,0.5)", "RGBA(250, 190, 190,0.5)", "RGBA(0, 128, 128,0.5)", "RGBA(230, 190, 255,0.5)", "RGBA(170, 110, 40,0.5)", "RGBA(255, 250, 200,0.5)", "RGBA(128, 0, 0,0.5)", "RGBA(170, 255, 195,0.5)", "RGBA(128, 128, 0,0.5)", "RGBA(255, 215, 180,0.5)"];
    this.data1 = json;

    
    //this.textLabel.value = this.data1.result.records[0].HBName + "test";
    var colors1 = [];
    var labels = this.data1.result.records.map(function(e) {
      colors1.push(dynamicColors());
      return e.TotalDeaths;
   });
   var data = this.data1.result.records.map(function(e) {
    colors1.push(dynamicColors());
      return e.TotalCases;
   });;
   var data2 = this.data1.result.records.map(function(e) {
    colors1.push(dynamicColors());
    return e.TotalNegative;
 });;
   
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: ["Total Cases", "Total Deaths", "Total Negatives"],
        datasets: [{
          label: ["number of people"],
          data: [this.data1.result.records[0].TotalCases, this.data1.result.records[0].TotalDeaths, this.data1.result.records[0].TotalNegative],
          backgroundColor: colors1,
          borderColor: colors1,
          borderWidth: 1
      },
      
    ],
    
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    }
    });
   

    
  });
  var dynamicColors = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  fetch('https://cors-anywhere.herokuapp.com/https://www.opendata.nhs.scot/api/3/action/datastore_search?resource_id=19646dce-d830-4ee0-a0a9-fcec79b5ac71').then(res => res.json())
  .then(json => {
    var i = 0;
    
    var backgroundColor = dynamicColors();
    this.data1 = json;
     var colors1 = [];
    
    //this.textLabel.value = this.data1.result.records[0].HBName + "test";
    
    var labels = this.data1.result.records.map(function(e) {
      colors1.push(dynamicColors());
      return e.AgeGroup;
   });
  
   var data = this.data1.result.records.map(function(e) {
    
      return e.TotalPositive;
   });
  
   
   
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: ["number of people"],
            data: data,
            
            backgroundColor: colors1 ,
            borderColor: colors1,
            borderWidth: 1
          }
        ]
      },
      options: {
       
    }
    });
   

    
  });
  fetch('https://cors-anywhere.herokuapp.com/https://www.opendata.nhs.scot/api/3/action/datastore_search?resource_id=19646dce-d830-4ee0-a0a9-fcec79b5ac71').then(res => res.json())
  .then(json => {
    var backgroundColor = ["RGBA(230, 25, 75,0.5)", "RGBA(60, 180, 75,0.5)", "RGBA(255, 225, 25,0.5)", "RGBA(0, 130, 200,0.5)", "RGBA(245, 130, 48,0.5)", "RGBA(145, 30, 180,0.5)", "RGBA(70, 240, 240,0.5)", "RGBA(240, 50, 230,0.5)", "RGBA(210, 245, 60,0.5)", "RGBA(250, 190, 190,0.5)", "RGBA(0, 128, 128,0.5)", "RGBA(230, 190, 255,0.5)", "RGBA(170, 110, 40,0.5)", "RGBA(255, 250, 200,0.5)", "RGBA(128, 0, 0,0.5)", "RGBA(170, 255, 195,0.5)", "RGBA(128, 128, 0,0.5)", "RGBA(255, 215, 180,0.5)"];
    this.data1 = json;

    
    //this.textLabel.value = this.data1.result.records[0].HBName + "test";
    var labels = this.data1.result.records.map(function(e) {
        
      return e.Sex;
   });
   var colors1 = [];
   var totalm = 0;
   var totalf = 0;
   var data = this.data1.result.records.map(function(e) {
    
    
    colors1.push(dynamicColors());
    if(e.Sex = "Male"){
      totalm = totalm + e.TotalPositive;
    }
    if(e.Sex = "Female"){
      totalf = totalf + e.TotalPositive;
    }
      return e.TotalPositive;
   });

   
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Male", "Female"],
        datasets: [{
          label: ["number of people"],
          data: [totalm, totalf],
          backgroundColor: colors1,
          borderColor: colors1,
          borderWidth: 1
      },
      
    ],
    
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    }
    
    
    });
   

    
  });

  
}


}




import { viewClassName } from '@angular/compiler';
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: 'app-testing-stats',
  templateUrl: './testing-stats.page.html',
  styleUrls: ['./testing-stats.page.scss'],
})
export class TestingStatsPage implements OnInit {

  @ViewChild("barCanvas", { static: true }) barCanvas: ElementRef;
  @ViewChild("lineCanvas", { static: true }) lineCanvas: ElementRef;
  @ViewChild("doughnutCanvas", { static: true }) doughnutCanvas: ElementRef;
  @ViewChild("text1") textLabel;   
  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;
  private data1: any;
  constructor() {}
  


  ngOnInit() {
    

    fetch('https://cors-anywhere.herokuapp.com/https://www.opendata.nhs.scot/api/3/action/datastore_search?resource_id=8da654cd-293b-4286-96a4-b3ece86225f0&limit=14').then(res => res.json())
    .then(json => {
      var backgroundColor = ["RGBA(230, 25, 75,0.5)", "RGBA(60, 180, 75,0.5)", "RGBA(255, 225, 25,0.5)", "RGBA(0, 130, 200,0.5)", "RGBA(245, 130, 48,0.5)", "RGBA(145, 30, 180,0.5)", "RGBA(70, 240, 240,0.5)", "RGBA(240, 50, 230,0.5)", "RGBA(210, 245, 60,0.5)", "RGBA(250, 190, 190,0.5)", "RGBA(0, 128, 128,0.5)", "RGBA(230, 190, 255,0.5)", "RGBA(170, 110, 40,0.5)", "RGBA(255, 250, 200,0.5)", "RGBA(128, 0, 0,0.5)", "RGBA(170, 255, 195,0.5)", "RGBA(128, 128, 0,0.5)", "RGBA(255, 215, 180,0.5)"];
      this.data1 = json;
      
      //this.textLabel.value = this.data1.result.records[0].HBName + "test";
      
      var labels = this.data1.result.records.map(function(e) {
        
        return e.HBName;
     });
     var data = this.data1.result.records.map(function(e) {
        return e.TotalTests;
     });;
     
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Tests by Health Board",
              data: data,
              backgroundColor: backgroundColor ,
              borderColor: backgroundColor,
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
     
  
      
    });
    // Generate Random Colours - called when dynamic colours are needed for data visualisation.
    var dynamicColors = function() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }
    fetch('https://cors-anywhere.herokuapp.com/https://www.opendata.nhs.scot/api/3/action/datastore_search?resource_id=3349540e-dc63-4d6d-a78b-00387b9aca50&limit=31').then(res => res.json())
    .then(json => {
      var i = 0;
      
      var backgroundColor = dynamicColors();
      this.data1 = json;
      
      //this.textLabel.value = this.data1.result.records[0].HBName + "test";
      
      var labels = this.data1.result.records.map(function(e) {
        
        return e.CAName;
     });
     var colors1 = [];
     var data = this.data1.result.records.map(function(e) {
      colors1.push(dynamicColors());
        return e.TotalTests;
     });
    
     
     
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Tests by Local Authority",
              data: data,
              
              backgroundColor: colors1 ,
              borderColor: colors1,
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
     
  
      
    });

    
  }

}

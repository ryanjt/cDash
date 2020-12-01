
import { viewClassName } from '@angular/compiler';
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import * as moment from 'moment';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-test2',
  templateUrl: './test2.page.html',
  styleUrls: ['./test2.page.scss'],
})
export class Test2Page implements OnInit {

  @ViewChild("barCanvas", { static: true }) barCanvas: ElementRef;
  @ViewChild("lineCanvas", { static: true }) lineCanvas: ElementRef;
  @ViewChild("doughnutCanvas", { static: true }) doughnutCanvas: ElementRef;
  @ViewChild("text1") textLabel;   
  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;
  private data1: any;
  constructor(public toastController: ToastController) {}
  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Last Update: Today @ 2pm.',
    duration: 2000,
    position: 'top'
  });
  toast.present();
}

  ngOnInit() {
    this.presentToast();
    
    var dynamicColors = function() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

    fetch('https://cors-anywhere.herokuapp.com/https://www.opendata.nhs.scot/api/3/action/datastore_search?resource_id=287fc645-4352-4477-9c8c-55bc054b7e76').then(res => res.json())
    .then(json => {
      
      this.data1 = json;
      
      //this.textLabel.value = this.data1.result.records[0].HBName + "test";
      var colors1 = [];
      var labels = this.data1.result.records.map(function(e) {
        var a = moment(e.Date, "YYYYMMDD");
        colors1.push(dynamicColors());
        return a;
     });
     
     var data = this.data1.result.records.map(function(e) {
     
        return e.Deaths;
     });
     
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Daily Deaths",
              data: data,
              backgroundColor: colors1 ,
              borderColor: colors1,
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            
            xAxes: [
              {
                type: 'time',
                displayFormats: {
                  month: 'YYYYMMDD'
              }
              }
            ]
          }
        }
      });
     
  
      
    });
    
    fetch('https://cors-anywhere.herokuapp.com/https://www.opendata.nhs.scot/api/3/action/datastore_search?resource_id=287fc645-4352-4477-9c8c-55bc054b7e76').then(res => res.json())
    .then(json => {
      var i = 0;
      
      var backgroundColor = dynamicColors();
      this.data1 = json;
      
      //this.textLabel.value = this.data1.result.records[0].HBName + "test";
      
      var labels = this.data1.result.records.map(function(e) {
        var a = moment(e.Date, "YYYYMMDD");
        return a;
     });
     var colors1 = [];
     var data = this.data1.result.records.map(function(e) {
      colors1.push(dynamicColors());
        return e.DailyCases;
     });
    
     
     
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Daily Cases",
              data: data,
              
              backgroundColor: colors1 ,
              borderColor: colors1,
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              stacked: true
          }],
            xAxes: [
              {
                type: 'time',
                displayFormats: {
                  month: 'YYYYMMDD'
              }
              }
            ]
          }
        }
      });
     
  
      
    });

    fetch('https://cors-anywhere.herokuapp.com/https://www.opendata.nhs.scot/api/3/action/datastore_search?resource_id=2dd8534b-0a6f-4744-9253-9565d62f96c2').then(res => res.json())
    .then(json => {
      var i = 0;
      
      var backgroundColor = dynamicColors();
      this.data1 = json;
      
      //this.textLabel.value = this.data1.result.records[0].HBName + "test";
      var colors1 = [];
      var labels = this.data1.result.records.map(function(e) {
        colors1.push(dynamicColors());
        return e.HBName;
     });
     
     var data = this.data1.result.records.map(function(e) {
      
        return e.DailyPositive;
     });
    
     
     
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Daily Cases by Health Board",
              data: data,
              
              backgroundColor: colors1 ,
              borderColor: colors1,
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              stacked: true
          }],
           
          }
        }
      });
     
  
      
    });

    
  }

  

}

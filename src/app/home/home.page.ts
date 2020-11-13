import { viewClassName } from '@angular/compiler';
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild("barCanvas", { static: true }) barCanvas: ElementRef;
  @ViewChild("lineCanvas", { static: true }) lineCanvas: ElementRef;
  @ViewChild("doughnutCanvas", { static: true }) doughnutCanvas: ElementRef;
  @ViewChild("text1") textLabel;   
  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;
  private data1: any;
  constructor() {}
  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


  ngOnInit() {
    

    fetch('https://cors-anywhere.herokuapp.com/https://www.opendata.nhs.scot/api/3/action/datastore_search?resource_id=7fad90e5-6f19-455b-bc07-694a22f8d5dc&limit=14').then(res => res.json())
    .then(json => {
      var backgroundColor = ["RGBA(230, 25, 75,0.5)", "RGBA(60, 180, 75,0.5)", "RGBA(255, 225, 25,0.5)", "RGBA(0, 130, 200,0.5)", "RGBA(245, 130, 48,0.5)", "RGBA(145, 30, 180,0.5)", "RGBA(70, 240, 240,0.5)", "RGBA(240, 50, 230,0.5)", "RGBA(210, 245, 60,0.5)", "RGBA(250, 190, 190,0.5)", "RGBA(0, 128, 128,0.5)", "RGBA(230, 190, 255,0.5)", "RGBA(170, 110, 40,0.5)", "RGBA(255, 250, 200,0.5)", "RGBA(128, 0, 0,0.5)", "RGBA(170, 255, 195,0.5)", "RGBA(128, 128, 0,0.5)", "RGBA(255, 215, 180,0.5)"];
      this.data1 = json;
      
      //this.textLabel.value = this.data1.result.records[0].HBName + "test";
      
      var labels = this.data1.result.records.map(function(e) {
        
        return e.HBName;
     });
     var data = this.data1.result.records.map(function(e) {
        return e.TotalCases;
     });;
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Total # of Cases",
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
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: "doughnut",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
            }
          ]
        }
      });
  
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
            {
              label: "My First dataset",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [65, 59, 80, 81, 56, 55, 40],
              spanGaps: false
            }
          ]
        }
      });
    });
    

    
  }

}

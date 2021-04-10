import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import 'chartjs-plugin-annotation';

@Component({
  selector: 'app-linear-chart',
  template: `
    <div id="chart-container">
	    <canvas #myCanvas id="canvas" baseChart [chartType]="chartType" [datasets]="chartData" [labels]="chartLabels" [options]="chartOptions"></canvas>
    </div>
    `
})

export class LinearComponent implements OnInit {

  @Input() data;

  @ViewChild('myCanvas')
  public canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public chartType: string = 'line';
  public chartData: any[];
  public chartLabels: any[];
  public chartColors: any[];
  public chartOptions: any;

  constructor() { }

  ngOnInit() {

    this.chartData = [{
      data: [10, 84, 18, 84, 40, 100],
      label: 'Data 1',
      fill: false,
      borderColor: "#FF326E"
    },
    {
      data: [10, 64, 10, 54, 15, 90],
      label: 'Data 2',
      fill: false,
      borderColor: "#008755"
    }
    ];
    this.chartLabels = ['01-07 Dec', '08-14 Dec', '15-21 Dec', '22-28 Dec', '29-31 Dec'];
    this.chartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      },
      line: {
        backgroundColor: "#f00"
      },
      annotation: {
        drawTime: 'beforeDatasetsDraw',
        annotations: [
          {
            type: 'box',
            id: 'a-box-1',
            yScaleID: 'y-axis-0',
            yMin: 0,
            yMax: 1,
            backgroundColor: '#ffffff'
          }, {
            type: 'box',
            id: 'a-box-2',
            yScaleID: 'y-axis-0',
            yMin: 1,
            yMax: 2.7,
            backgroundColor: '#ffffff'
          }, {
            type: 'box',
            id: 'a-box-3',
            yScaleID: 'y-axis-0',
            yMin: 2.7,
            yMax: 5,
            backgroundColor: '#ffffff'
          }
        ]
      }
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ChartComponent
} from 'ng-apexcharts';

@Component({
  selector: 'pie-chart-mini',
  template:`
    <div class="chart" #chart>
    <apx-chart
      [series]="chartOptions.series"
      [chart]="chartOptions.chart"
      [plotOptions]="chartOptions.plotOptions"
      [colors]="chartOptions.colors"
      [dataLabels]="chartOptions.dataLabels"
      [legend]="chartOptions.legend"
      [labels]="chartOptions.labels"
      [responsive]="chartOptions.responsive">
    </apx-chart>
    </div>
  `,
  styles:['']
})
export class PieChartMiniComponent  implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  
  public chartOptions;

  constructor() {

  }
  ngOnInit(){
    this.chartOptions = {
      series: [40, 35, 25],
      chart: {
        type: "donut",
        width: 160
      },
      plotOptions:{
        pie:{
          customScale:1,
          offsetX:10 ,
          offsetY: 5,
          donut:{
            size:"60%",
            labels:{
              show:true,
              value: {
                offsetY: -17,
                show: true,
                fontSize: '.8em',
                fontFamily: '29LT Bukra - Bold !important',
                fontWeight:'bold',
                opacity:.9,
              },
              total:{
                show:true,
                offsetY: 4,
                label:'Total',
                showAlways: true,
                fontSize: '.8em',
              },
              name: {
                show: true,
                offsetY: 13,
                fontSize: '1.3em',
              }
            }
          }
        }
      },
      dataLabels:{
        enabled: false,
      },
      legend:{
        show: false,
        position: 'bottom',
      },
      responsive: [
        {
          breakpoint: 1920,
          options: {
            chart: {
              width: 140
            },
          }
        },
        {
          breakpoint: 1600,
          options: {
            chart: {
              width: 130
            },
          }
        },
        {
          breakpoint: 1365,
          options: {
            chart: {
              width: 120
            },
          }
        }
      ],
      colors:['#B1EECF','#39DA8A','#F2F4F4'],
      labels:['X Fleet' , 'In Active']
    };
  }
}
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  colors: string[];
  labels: any;
};
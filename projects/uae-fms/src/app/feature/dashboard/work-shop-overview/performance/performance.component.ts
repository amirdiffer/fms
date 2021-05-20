import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexGrid,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexTooltip,
  ApexLegend,
  ApexResponsive
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  tooltip: ApexTooltip;
  title: ApexTitleSubtitle;
  legend:ApexLegend;
  responsive:ApexResponsive[];

};

@Component({
  selector: 'dashboard-workshop-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "OnTim",
          data: [
            5.2,
            4,
            1.8,
            2.2,
            5.1,
            2.1,
            4.9
          ]
        },
        {
          name: "Delay",
          data: [
            0,
            -2.2,
            -5,
            -4.9,
            -1.3,
            0,
            -2,
          ]
        }
      ],
      chart: {
        type: "bar",
        height: 300,
        stacked: true,
        toolbar:{
          show:false
        }
      },
      colors: ["#A3A1FB", "#E0F5FC"],
      plotOptions: {
        bar: {
          horizontal: false,
          barHeight: "80%",
          endingShape:"flat",
          colors:{
            backgroundBarRadius: 5
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },

      grid: {
        show:false,
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      yaxis: {
        min: -5,
        max: 5,
        labels:{
          show:true,
          formatter: function(val) {
            if(val == 0){
              return `val`
            }
            if(val > 0){
              return `$${val}k`
            }else{
              return `-$${Math.abs(val)}k`
            }
          }
        }
      },
      tooltip: {
        shared: false,
        x: {
          formatter: function(val) {
            return val.toString();
          }
        },
        y: {
          formatter: function(val) {
            return Math.abs(val) + "%";
          }
        }
      },
      xaxis: {
        type:'category',
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
        ],
        labels: {
          show:true,
        }
      },
      legend:{
        show:true,
        position:'top',
        horizontalAlign:'right',
        markers:{
          radius:50
        }
      },
      responsive: [
        {
          breakpoint: 1920,
          options: {
            chart: {
              height: 300,
            },
          }
        },
        {
          breakpoint: 1600,
          options: {
            chart: {
              height: 270,
            },
          }
        },
        {
          breakpoint: 1365,
          options: {
            chart: {
              height: 240,
            },
          }
        }
      ],
    };
   }

  ngOnInit(): void {
  }

}

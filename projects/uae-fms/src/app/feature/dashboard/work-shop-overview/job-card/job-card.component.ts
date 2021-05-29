import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexFill,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
  ApexResponsive
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill:ApexFill;
  colors:any;
  yaxis:ApexYAxis;
  legend:ApexLegend;
  grid:ApexGrid;
  responsive:ApexResponsive[];
};
@Component({
  selector: 'dashboard-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() { 
    this.chartOptions = {
      series: [
        {
          name: "Job Card",
          data: [20 ,92, 32, 102, 45, 120, 78, 100]
        },
      ],
      chart: {
        height: 120,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      legend:{
        show:false,
      },
      stroke: {
        show:true,
        curve: "smooth",
        colors: ['#1FD286'],
        lineCap:'round',
        width:3
      },
      xaxis: {
        labels:{
          show:false
        },
        axisBorder:{
          show:false
        },
        axisTicks:{
          show:false
        }
      },
      yaxis:{
        labels:{
          show:false
        }
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      },
      colors:['#1FD286'],
      fill:{
        opacity:.7,
        gradient:{
          opacityFrom: .7,
          opacityTo: .4,
        }
      },
      grid:{
        show:false
      },
      responsive: [
        {
          breakpoint: 1920,
          options: {
            chart: {
              height: 110,
            },
          }
        },
        {
          breakpoint: 1600,
          options: {
            chart: {
              height: 100,
            },
          }
        },
        {
          breakpoint: 1365,
          options: {
            chart: {
              height: 90,
            },
          }
        }
      ],
    };
  }


  ngOnInit(): void {
  }

}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ChartComponent
} from 'ng-apexcharts';

@Component({
  selector: 'regular-radial-progress-bar',
  template:`
  <div #chart>
    <apx-chart
        [series]="chartOptions.series"
        [chart]="chartOptions.chart"
        [plotOptions]="chartOptions.plotOptions"
        [colors]="chartOptions.colors"
        [responsive]="chartOptions.responsive">
    </apx-chart>
  </div>
  `,
  styleUrls: ['./chart-progress-bar.scss']
})
export class RegularRadialProgressBarComponent implements OnInit {
  @Input() percent;
  @Input() color;
  checkIcon = 'assets/icons/checked.svg';
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() {}

  ngOnInit() {
    this.chartOptions = {
      series: [this.percent ? this.percent : 100],
      chart: {
        height: 100,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              show: false
            }
          },
          hollow: {
            size: `40%`
          }
        }
      },
      responsive: [
        {
          breakpoint: 1920,
          options: {
            chart: {
              height: 90
            },
          }
        },
        {
          breakpoint: 1600,
          options: {
            chart: {
              height: 85
            },
          }
        },
        {
          breakpoint: 1365,
          options: {
            chart: {
              height: 80
            },
          }
        }
      ],
      colors: [this.color]
    };
  }
}
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  plotOptions: ApexPlotOptions;
  responsive:ApexResponsive[];
};

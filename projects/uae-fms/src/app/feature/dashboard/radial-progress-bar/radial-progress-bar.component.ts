import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ChartComponent
} from 'ng-apexcharts';

@Component({
  selector: 'anms-radial-progress-bar',
  templateUrl: './radial-progress-bar.component.html',
  styleUrls: ['./radial-progress-bar.component.scss']
})
export class RadialProgressBarComponent implements OnInit {
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
      colors: [this.color]
    };
  }
}
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  plotOptions: ApexPlotOptions;
};

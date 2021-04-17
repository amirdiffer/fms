import { Component, Input, OnChanges, OnInit, ViewChild, } from '@angular/core';
import {
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
    ChartComponent
  } from "ng-apexcharts";

@Component({
  selector: 'radialBar-renderer',
  template: `
    <div class="row">
        <div class="col-4">
            <div id="chart" class="chart-custom">
                <apx-chart
                    [series]="chartOptions.series"
                    [chart]="chartOptions.chart"
                    [plotOptions]="chartOptions.plotOptions"
                    [colors]="chartOptions.colors">
                </apx-chart>
            </div>
        </div>
        <div *ngIf="percent == 100" class="col-8">
            <span>
                <svg-icon [src]="checkIcon" [svgStyle]="{ 'width.em':1.4 , 'fill': '#0DA06E' , 'height': '100%'}"></svg-icon>
            </span>
            <span class="title">Completed</span>
        </div>
    </div>

  `,
  styles: [
    `
    :host ::ng-deep .apexcharts-datalabel-value{
        transform: translate(0px, -13px);
        font-size: 80%;
    }
    .chart-custom{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .title{
        color: #0DA06E;
        margin: 0 .3em;
        font-weight:bold;
    }
    `
  ]
})
export class RadialBarRendererComponent implements OnInit  {
    @Input() percent;
    checkIcon = 'assets/icons/checked.svg'
    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    constructor() {}

    ngOnInit() {
        this.chartOptions = {
            series: [this.percent ? this.percent : 100],
            chart: {
              height: 100,
              type: "radialBar"
            },
            plotOptions: {
              radialBar: {
                dataLabels:{
                      name:{
                          show:false
                      }
                },
                hollow: {
                  size: `40%`,
                }
              }
            },
            colors: [this.percent > 80 ? '#0DA06E' : '#6F7BF0']
          };
    }

}

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    colors: string[];
    plotOptions: ApexPlotOptions;
};

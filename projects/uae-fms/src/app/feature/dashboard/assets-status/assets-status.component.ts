import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent, ApexLegend
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
};

@Component({
  selector: 'anms-assets-status',
  templateUrl: './assets-status.component.html',
  styleUrls: ['./assets-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetsStatusComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() {}

  ngOnInit(): void {
    console.log(this.chart);
    this.chartOptions = {
      series: [44, 55, 67, 83],
      chart: {
        height: 300,
        width:'100%',
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 5,
            size: '70%',
            background: 'transparent',
            image: undefined
          },
          dataLabels: {
            name: {
              fontSize: '22px'
            },
            value: {
              fontSize: '16px'
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                return '1235266';
              }
            }
          }
        }
      },
      legend: {
        show: true,
        floating: false,
        position: "bottom",
        labels: {
          useSeriesColors: true,
        },
        markers: {
          width: 8,
          height: 8,

        },
        itemMargin: {
          horizontal: 10
        }
      },
      labels: ['Active', 'Defleet', 'Reused', 'Total Lost'],
      colors: ['#26D07C', '#F1EB9C', '#26D07C', '#E4002B']
    };
  }
}

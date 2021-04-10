import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApexNonAxisChartSeries, ApexPlotOptions, ApexChart, ChartComponent, ApexLegend } from 'ng-apexcharts';

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

  translations = {
    'dashboard.active': '',
    'dashboard.reused': '',
    'dashboard.defleet': '',
    'dashboard.total_lost': '',
    'dashboard.total': ''
  };

  constructor(private translationService: TranslateService) {
    this.getTranslations();
  }

  getTranslations() {
    const translationLabels = Object.keys(this.translations);
    this.translationService.get(translationLabels).subscribe((translation) => {
      this.translations = translation;
    });
  }

  ngOnInit(): void {
    this.chartOptions = {
      series: [44, 55, 67, 83],
      chart: {
        height: '360px',
        type: 'radialBar',
        width: '100%'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 5,
            size: '67%',
            background: 'transparent',
            image: undefined
          },
          track: {
            show: false
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
              label: this.translations['dashboard.total'],
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
        position: 'bottom',
        labels: {
          useSeriesColors: true
        },
        markers: {
          width: 8,
          height: 8
        },
        itemMargin: {
          horizontal: 10
        }
      },
      labels: [
        this.translations['dashboard.active'],
        this.translations['dashboard.defleet'],
        this.translations['dashboard.reused'],
        this.translations['dashboard.total_lost']
      ],
      colors: ['#26D07C', '#F1EB9C', '#26D07C', '#E4002B']
    };
  }
}

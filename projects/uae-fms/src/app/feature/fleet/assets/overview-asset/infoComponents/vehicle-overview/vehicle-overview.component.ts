import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from 'ng-apexcharts';
import { ColumnType } from '@core/table';
import { map } from 'rxjs/operators';
import { AssetMasterService } from '@feature/fleet/+state/assets/asset-master';
import { CustomizationService } from '@feature/fleet/+state/assets/customization';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-vehicle-overview',
  templateUrl: './vehicle-overview.component.html',
  styleUrls: ['../styles.scss']
})
export class VehicleOverviewComponent implements OnInit {
  @Input() assetID;
  @ViewChild('chart') chart: ChartComponent;
  chartOptions: Partial<ChartOptions>;
  chartOptionsColumn: Partial<ChartOptions>;
  selectedTab = 'sub_asset';
  damageList = [];
  fileServer = environment.baseApiUrl + 'document/';

  data = {
    totalKm: 14245,
    currentFuel: 123,
    totalFuel: 12345,
    battryUse: 67,
    slackCredit: 1234,
    totalOil: 123456,
    totalBrake: 123456,
    totalTire: 123456,
    totalEngin: 123456,
    speedAverage: 480,
    workoutStatic: {
      kmDays: {
        title: 'Km/Day',
        data: [
          { data: '1/12/2020', km: 10 },
          { data: '2/12/2020', km: 40 },
          { data: '3/12/2020', km: 10 },
          { data: '4/12/2020', km: 60 },
          { data: '5/12/2020', km: 80 },
          { data: '6/12/2020', km: 100 },
          { data: '7/12/2020', km: 45 },
          { data: '8/12/2020', km: 20 }
        ]
      },
      hoursDay: {
        title: 'Hours / Day',
        data: [
          { data: '1/12/2020', km: 10 },
          { data: '2/12/2020', km: 50 },
          { data: '3/12/2020', km: 20 },
          { data: '4/12/2020', km: 70 },
          { data: '5/12/2020', km: 90 },
          { data: '6/12/2020', km: 100 },
          { data: '7/12/2020', km: 55 },
          { data: '8/12/2020', km: 40 }
        ]
      },
      average: {
        title: 'Fleet Average',
        data: 80
      }
    },
    reminders: [
      {
        title: 'salik_top_up',
        date: new Date(),
        status: 'over'
      },
      {
        title: 'service_appointment',
        date: new Date(),
        status: 'normal'
      },
      {
        title: 'gps_alert_system_service',
        date: new Date(),
        status: 'normal2'
      },
      {
        title: 'monthly_check_up',
        date: new Date(),
        status: 'normal'
      },
      {
        title: 'upgrade_tracking_system',
        date: new Date(),
        status: 'normal2'
      },
      {
        title: 'sterilization',
        date: new Date(),
        status: 'urgent'
      }
    ],
    vhicle: {
      details: [
        'Text text text text text',
        'Text text text  text',
        'Text text text text text',
        'Text text text',
        'Text text text text',
        'Text 12345678',
        'Text 1234345',
        '2020',
        'Text text text text',
        'Text text text',
        'Text text text',
        'Text text',
        'Text text text text'
      ],
      title: 'Title title',
      info:
        'Text text text text text  text text text text  text text text text  text text text text  text text text text  text text text text  text text text text Text text text text text  text text text text  text text text text  text text text text  text',
      speed: [
        { title: 'Text text text', precent: 70 },
        { title: 'Text text text', precent: 70 },
        { title: 'Text text text', precent: 70 },
        { title: 'Text text text', precent: 70 }
      ]
    }
  };
  activeLayout = 'menu';
  TaskMaster_tableSetting = {
    columns: [
      {
        lable: 'tables.column.task_list',
        field: 'task_list',
        type: ColumnType.lable,
        thumbField: ''
      },
      {
        lable: 'tables.column.date',
        field: 'date',
        width: 200,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'dateRenderer'
      },
      {
        lable: 'tables.column.technician',
        field: 'technician',
        width: 130,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.status',
        field: 'Status',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'statusRenderer'
      }
    ],
    data: []
  };
  SubAsset_tableSetting = {
    columns: [
      {
        lable: 'tables.column.name',
        field: 'name',
        type: ColumnType.lable,
        thumbField: ''
      },
      {
        lable: 'tables.column.s_n',
        field: 's_n',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.status',
        field: 'Status',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'statusRenderer'
      }
    ],
    data: []
  };
  Accessory_tableSetting = {
    columns: [
      {
        lable: 'tables.column.name',
        field: 'name',
        type: ColumnType.lable,
        thumbField: ''
      },
      // {
      //   lable: 'tables.column.s_n',
      //   field: 's_n',
      //   type: ColumnType.lable,
      //   thumbField: '',
      //   renderer: ''
      // },
      {
        lable: 'tables.column.status',
        field: 'Status',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'statusRenderer'
      }
    ],
    data: []
  };

  chartTrafficFineData = {
    series: [],
    labels: []
  };
  chartFuelCardData = {
    series: [],
    categories: []
  };

  constructor(
    private assetService: AssetMasterService,
    private customizationService: CustomizationService
  ) {
    this.chartOptions = {
      series: [],
      labels: [],
      chart: {
        type: 'donut',
        height: 280
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%'
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: false,
              total: {
                show: false,
                label: 'Total',
                color: '#373d3f',
                showAlways: true,
                fontFamily: '29LT Bukra',
                formatter: (w) => {
                  return (
                    w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0) + ' AED'
                  );
                }
              },
              name: {
                offsetY: 18,
                fontSize: '8px'
              },
              value: {
                offsetY: -15
              }
            }
          }
        }
      }
    };
    this.chartOptionsColumn = {
      series: [
        {
          name: 'Demanded',
          data: [44, 55, 57, 56, 61, 58]
        },
        {
          name: 'Consumption',
          data: [76, 85, 101, 98, 87, 105]
        }
      ],
      chart: {
        type: 'bar',
        height: 280,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'top'
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'top'
            }
          }
        }
      ]
    };
  }

  ngOnInit() {
    this.assetService.getAssetTasksByID(this.assetID).subscribe((x) => {
      let data = x.message;
      this.TaskMaster_tableSetting.data = (<Array<object>>data).map((x) => {
        return {
          task_list: x['name'],
          date: x['creationDate'],
          technician:
            x['technician']['firstName'] + ' ' + x['technician']['lastName'],
          Status: x['status']
        };
      });
    });
    this.customizationService
      .getAssetForCustomizationByAssetId(this.assetID)
      .subscribe((x) => {
        console.log(x);
        let subAsset = x.message.subAssets;
        let accessories = x.message.accessories;
        this.SubAsset_tableSetting.data = (<Array<object>>subAsset).map((x) => {
          return {
            name: x['subAssetMakeName'] + ' ' + x['subAssetModelName'],
            s_n: x['subAssetSerialNumber'],
            Status: x['subAssetId'] != null ? 'Uninstall' : 'Install'
          };
        });
        this.Accessory_tableSetting.data = (<Array<object>>accessories).map(
          (x) => {
            return {
              name: x['accessoryItemName'],
              Status: x['accessoryId'] != null ? 'Uninstall' : 'Install'
            };
          }
        );
      });
    this.assetService.getDamageByAssetID(this.assetID).subscribe((x) => {
      this.damageList = x.message;
    });
    this.assetService.getTrafficFineByAssetID(this.assetID).subscribe((x) => {
      let data = x.message;
      this.chartTrafficFineData.labels = Object.keys(data);
      this.chartTrafficFineData.series = Object.values(data);
    });
    this.assetService.getFuelCardByAssetID(this.assetID).subscribe((x) => {
      let data = <Array<object>>x.message;
      this.chartFuelCardData.categories = data.map((d) => d['month']);
      let demanded = data.map((d) => d['demanded']);
      let consumption = data.map((d) => d['consumption']);
      this.chartFuelCardData.series = [
        {
          name: 'Demanded',
          data: demanded
        },
        {
          name: 'Consumption',
          data: consumption
        }
      ];
      console.log(this.chartFuelCardData);
    });
  }
}

export interface ChartOptions {
  series: any;
  labels: any;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
}

export interface WorkStatisticsChartSettings {
  dates: string[];
  hoursPerDayData: number[];
  kilometersPerDayData: number[];
}

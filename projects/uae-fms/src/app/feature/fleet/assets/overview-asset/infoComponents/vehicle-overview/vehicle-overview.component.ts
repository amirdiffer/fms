import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels, ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers, ApexNonAxisChartSeries, ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle, ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from 'ng-apexcharts';
import { ColumnType } from '@core/table';

@Component({
  selector: 'app-vehicle-overview',
  templateUrl: './vehicle-overview.component.html',
  styleUrls: ['../styles.scss']
})
export class VehicleOverviewComponent implements OnInit {
  @Input() vehicleId;
  @ViewChild('chart') chart: ChartComponent;
  chartOptions: Partial<ChartOptions>;
  chartOptionsColumn: Partial<ChartOptions>;
  selectedTab = 'sub_asset';

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
  tableSetting = {
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
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
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
    data: [
      {
        task_list: 'Charge Oil After 456 Km',
        date: '20/20/2020',
        technician: 'Sam Smith',
        Status: 'Done'
      },
      {
        task_list: 'Charge Oil After 456 Km',
        date: '20/20/2020',
        technician: 'Sam Smith',
        Status: 'Done'
      },
      {
        task_list: 'Charge Oil After 456 Km',
        date: '20/20/2020',
        technician: 'Sam Smith',
        Status: 'Todo'
      },
      {
        task_list: 'Charge Oil After 456 Km',
        date: '20/20/2020',
        technician: 'Sam Smith',
        Status: 'Doing'
      },
      {
        task_list: 'Charge Oil After 456 Km',
        date: '20/20/2020',
        technician: 'Sam Smith',
        Status: 'Start'
      },
      {
        task_list: 'Charge Oil After 456 Km',
        date: '20/20/2020',
        technician: 'Sam Smith',
        Status: 'Start'
      }
    ]
  };
  tableSetting2 = {
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
    data: [
      {
        name: 'First Camera',
        s_n: '4894949849',
        Status: 'Install'
      },
      {
        name: 'Second Camera',
        s_n: '48949498490',
        Status: 'JobCard'
      },
      {
        name: 'First Camera',
        s_n: '4894949849',
        Status: 'Install'
      },
      {
        name: 'First Camera',
        s_n: '4894949849',
        Status: 'Install'
      },
      {
        name: 'First Camera',
        s_n: '4894949849',
        Status: 'Install'
      },
      {
        name: 'First Camera',
        s_n: '4894949849',
        Status: 'Install'
      }
    ]
  };


  constructor() {
    this.chartOptions = {
      series: [44, 55, 41],
      labels: ["Paid", "Unpaid", "Deducted"],
      chart: {
        type: 'donut',
        height: 280,
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
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
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b
                  }, 0) + ' AED'
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
      series: [{
        name: 'Demanded',
        data: [44, 55, 57, 56, 61, 58]
      }, {
        name: 'Consumption',
        data: [76, 85, 101, 98, 87, 105]
      }],
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
        },
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'top'
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'top'
          }
        }
      }]
    }
  }

  ngOnInit() {}
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

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from 'ng-apexcharts';

@Component({
  selector: 'app-vehicle-overview',
  templateUrl: './vehicle-overview.component.html',
  styleUrls: ['../styles.scss']
})
export class VehicleOverviewComponent implements OnInit {
  @Input() vehicleId;
  @ViewChild('chart') chart: ChartComponent;
  chartOptions: Partial<ChartOptions>;

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
  constructor() {
    const lineChartData: WorkStatisticsChartSettings = {
      dates: ['01-07 Dec', '18-14 Dec', '15-21 Dec', '22-28 Dec', '29-31 Dec'],
      hoursPerDayData: [10, 80, 18, 70, 100],
      kilometersPerDayData: [10, 30, 10, 18, 90]
    };

    this.chartOptions = {
      series: [
        {
          name: 'Hours/Day',
          data: lineChartData.hoursPerDayData
        },
        {
          name: 'Km/Day',
          data: lineChartData.kilometersPerDayData
        }
      ],
      chart: {
        height: 350,
        width: '650px',
        zoom: {
          enabled: false
        },
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#FF326E', '#008755'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Workout Statistics',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 6,
        shape: 'circle'
      },
      xaxis: {
        categories: lineChartData.dates
      },
      yaxis: {
        title: {
          text: 'Fleet Average'
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      responsive: [
        {
          breakpoint: 1750,
          options: {
            chart: {
              width: '600px'
            }
          }
        },
        {
          breakpoint: 1675,
          options: {
            chart: {
              width: '550px'
            }
          }
        },
        {
          breakpoint: 1600,
          options: {
            chart: {
              width: '500px'
            }
          }
        },
        {
          breakpoint: 1550,
          options: {
            chart: {
              width: '450px'
            }
          }
        },
        {
          breakpoint: 1475,
          options: {
            chart: {
              width: '400px'
            }
          }
        },
        {
          breakpoint: 1410,
          options: {
            chart: {
              width: '700px'
            }
          }
        },
        {
          breakpoint: 1320,
          options: {
            chart: {
              width: '600px'
            }
          }
        },
        {
          breakpoint: 1185,
          options: {
            chart: {
              width: '500px'
            }
          }
        },
        {
          breakpoint: 1050,
          options: {
            chart: {
              width: '400px'
            }
          }
        }
      ]
    };
  }

  ngOnInit() {}
}

export interface ChartOptions {
  series: ApexAxisChartSeries;
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
}

export interface WorkStatisticsChartSettings {
  dates: string[];
  hoursPerDayData: number[];
  kilometersPerDayData: number[];
}

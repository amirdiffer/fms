import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SettingsFacade } from '@core/settings/settings.facade';
import { TranslateService } from '@ngx-translate/core';
import ApexCharts from 'apexcharts';
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
  ApexResponsive
} from "ng-apexcharts";
import { Subscription } from 'rxjs';

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
  responsive:ApexResponsive[];
};
@Component({
  selector: 'dashboard-movement-overview',
  templateUrl: './movement-overview.component.html',
  styleUrls: ['./movement-overview.component.scss']
})
export class MovementOverviewComponent implements OnInit , OnDestroy {
  @ViewChild("chartMovement",{static:true}) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  setting$:Subscription;
  constructor(private _setting : SettingsFacade) { 
    this.chartOptions = {
      series: [
        {
          name: "Ongoing Booking",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "Finished Booking",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 350,
        type: "area",
        redrawOnParentResize: true
      },
      dataLabels: {
        enabled: false
      },
      legend:{
        show:true,
        horizontalAlign:'left',
        fontFamily: '29LT Bukra',
        offsetX: 0,
        offsetY: 15,
        markers:{
          offsetX:15
        }
      },
      stroke: {
        show:false,
        curve: "smooth",
        colors: ['#00CFDD','#39DA8A'],
        dashArray:10,
      },
      xaxis: {
        type: "category",
        categories: [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun"
        ],
        
        
      },
      yaxis:{
        opposite:false,
        forceNiceScale:true,
        labels:{
          offsetX:5
        }
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      },
      colors:['#00CFDD','#39DA8A'],
      fill:{
        opacity:1,
        gradient:{
          opacityFrom: 1,
          opacityTo: 1,
        }
      },
      responsive: [
        {
          breakpoint: 1920,
          options: {
            chart: {
              height: 320,
            },
          }
        },
        {
          breakpoint: 1600,
          options: {
            chart: {
              height: 290,
            },
          }
        },
        {
          breakpoint: 1365,
          options: {
            chart: {
              height: 260,
            },
          }
        }
      ],
    };
  }


  ngOnInit(): void {
    this.setting$ = this._setting.language.subscribe(
      x => {
        if(x && x === 'ar'){
          this.chartOptions.series = [
            {
              name: "الحجز المستمر",
              data: [31, 40, 28, 51, 42, 109, 100]
            },
            {
              name: "انتهى الحجز",
              data: [11, 32, 45, 32, 34, 52, 41]
            }
          ];
          this.chartOptions.yaxis = {
            opposite:true,
            forceNiceScale:true,
            labels:{
              offsetX:-5
            }
          };
          
        }else{
          this.chartOptions.series = [
            {
              name: "Ongoing Booking",
              data: [31, 40, 28, 51, 42, 109, 100]
            },
            {
              name: "Finished Booking",
              data: [11, 32, 45, 32, 34, 52, 41]
            }
          ]
          this.chartOptions.yaxis = {
            opposite:false,
            forceNiceScale:true,
            labels:{
              offsetX:5
            }
          };
        }
      }
    );
  }

  ngOnDestroy(){
    this.setting$.unsubscribe()
  }


}



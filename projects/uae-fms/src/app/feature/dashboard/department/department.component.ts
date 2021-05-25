import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'dashboard-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input() chartData:IDepartmentChartData[] = [
    {
      title:'dashboard.hr',
      value:30,
      color:'#2BB2AD'
    },
    {
      title:'dashboard.fincaical',
      value:15,
      color:'#FFC700'
    },
    {
      title:'dashboard.store',
      value:50,
      color:'#6F7BF0'
    }
  ]
  public chartOptions;
  private series=[]
  private title=[]
  private color=[]
  constructor() {
    this.chartData.map(x => { this.series.push(x.value) ; this.title.push(x.title); this.color.push(x.color)})
    this.chartOptions = {
      series: this.series,
      chart: {
        type: "donut",
        width: 150
      },
      plotOptions:{
        pie:{
          customScale:1,
          offsetX:10 ,
          offsetY: 5,
          donut:{
            size:"85%",
            labels:{
              show:false,
            }
          }
        }
      },
      dataLabels:{
        enabled: false,
      },
      legend:{
        show: false,
        position: 'bottom',
      },
      responsive: [
        {
          breakpoint: 1920,
          options: {
            chart: {
              width: 130
            },
            plotOptions:{
              pie:{
                donut:{
                  size:"85%",
                }
              }
            }
          }
        },
        {
          breakpoint: 1600,
          options: {
            chart: {
              width: 120
            },
            plotOptions:{
              pie:{
                donut:{
                  size:"82%",
                }
              }
            }
          }
        },
        {
          breakpoint: 1365,
          options: {
            chart: {
              width: 110
            },
            plotOptions:{
              pie:{
                donut:{
                  size:"78%",
                }
              }
            }
          }
        }
      ],
      colors:this.color,
      labels:this.title
    };
   }

  ngOnInit(): void {
  }

}

export interface IDepartmentChartData{
  title:string;
  value:number;
  color:string;
}

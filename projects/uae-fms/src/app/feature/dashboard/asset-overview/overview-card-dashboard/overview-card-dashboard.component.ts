import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ChartComponent
} from 'ng-apexcharts';
import { ICardDetailRedialChart } from '@feature/dashboard/asset-overview/detail-card-dashboard/detail-card-dashboard.component';
import { IAssetOverview } from '@models/asset-master.model';
@Component({
  selector: 'overview-card-dashboard',
  templateUrl: './overview-card-dashboard.component.html',
  styleUrls: ['./overview-card-dashboard.component.scss']
})
export class OverviewCardDashboardComponent implements OnInit {

  @Input() chartData: IAssetOverview;
  helpIcon = 'assets/icons/question-circle.svg';
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions;
  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      series: [],
      chart: {
        type: "donut",
        width: 350
      },
      plotOptions:{
        pie:{
          customScale:1,
          offsetX:10 ,
          offsetY: 5,
          startAngle: -135,
          endAngle: 135,
          donut:{
            size:"95%",
            labels:{
              show:true,
              value: {
                offsetY: -25,
                show: true,
                fontSize: '1.5em',
                fontFamily: '29LT Bukra - Bold !important',
                fontWeight:'bold'
              },
              total:{
                show:true,
                offsetY: 30,
                label:'Total',
                showAlways: true,
                fontSize: '1.3em',
              },
              name: {
                show: true,
                offsetY: 25,
                fontSize: '1.3em',
              }
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
              width: 300
            },
            plotOptions:{
              pie:{
                donut:{
                  size:"95%",
                }
              }
            }
          }
        },
        {
          breakpoint: 1600,
          options: {
            chart: {
              width: 260
            },
            plotOptions:{
              pie:{
                donut:{
                  size:"93%",
                }
              }
            }
          }
        },
        {
          breakpoint: 1365,
          options: {
            chart: {
              width: 220
            },
            plotOptions:{
              pie:{
                donut:{
                  size:"91%",
                }
              }
            }
          }
        }
      ],
      colors:['#39DA8A','#B1EECF','#DFFFEF'],
      labels:['Active' , 'In Active' , 'X Fleet']
    };

    // this.chart.updateSeries([
    //   this.chartData.numOfActiveAssets, this.chartData.numOfInactiveAssets, this.chartData.numOfXFleetAssets
    // ], true);
    //
    // this.chartData.
  }

}

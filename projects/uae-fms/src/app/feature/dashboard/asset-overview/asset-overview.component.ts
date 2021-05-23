import { Component, OnInit } from '@angular/core';
import { ICardDetailRedialChart } from './detail-card-dashboard/detail-card-dashboard.component';

@Component({
  selector: 'dashboard-asset-overview',
  templateUrl: './asset-overview.component.html',
  styleUrls: ['./asset-overview.component.scss']
})
export class AssetOverviewComponent implements OnInit {
  bussinessCategoryChartData:ICardDetailRedialChart[] =[
    {
      title:'VIP',
      percent:79.3,
      color:'#39DA8A'
    },
    {
      title:'VIP',
      percent:42.5,
      color:'#6F7BF0'
    },
    {
      title:'VIP',
      percent:25.1,
      color:'#FF5B5C'
    },
    {
      title:'VIP',
      percent:79.3,
      color:'#39DA8A'
    },
    {
      title:'VIP',
      percent:42.5,
      color:'#6F7BF0'
    },
    {
      title:'VIP',
      percent:25.1,
      color:'#FF5B5C'
    },
    {
      title:'VIP',
      percent:79.3,
      color:'#39DA8A'
    },
    {
      title:'VIP',
      percent:42.5,
      color:'#6F7BF0'
    },
    {
      title:'VIP',
      percent:25.1,
      color:'#FF5B5C'
    }
  ];
  AssetDepartmentChartData:ICardDetailRedialChart[] =[
    {
      title:'Inancial',
      percent:79.3,
      color:'#39DA8A'
    },
    {
      title:'Manager',
      percent:42.5,
      color:'#6F7BF0'
    },
    {
      title:'Hr',
      percent:25.1,
      color:'#FF5B5C'
    },
    {
      title:'Inancial',
      percent:79.3,
      color:'#39DA8A'
    },
    {
      title:'Manager',
      percent:42.5,
      color:'#6F7BF0'
    },
    {
      title:'Hr',
      percent:25.1,
      color:'#FF5B5C'
    },
    {
      title:'Inancial',
      percent:79.3,
      color:'#39DA8A'
    },
    {
      title:'Manager',
      percent:42.5,
      color:'#6F7BF0'
    },
    {
      title:'Hr',
      percent:25.1,
      color:'#FF5B5C'
    },
    {
      title:'Inancial',
      percent:79.3,
      color:'#39DA8A'
    },
    {
      title:'Manager',
      percent:42.5,
      color:'#6F7BF0'
    },
    {
      title:'Hr',
      percent:25.1,
      color:'#FF5B5C'
    },

  ];
  constructor() { }

  ngOnInit(): void {
  }

}

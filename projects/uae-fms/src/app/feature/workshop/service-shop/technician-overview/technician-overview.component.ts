import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting, ColumnType } from '@core/table';

@Component({
  selector: 'anms-technician-overview',
  templateUrl: './technician-overview.component.html',
  styleUrls: ['./technician-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicianOverviewServiceShopComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  selectedTab = 'overview';
  editIcon='assets/icons/pen.svg';

  skillTable:TableSetting = {
    columns: [
      {
        lable: 'tables.column.skill',
        field: 'skill',
        type: 1,
      },
      {
        lable: 'tables.column.rate_per_hour',
        field: 'ratePerHour',
        type: 1,
      }
    ],
    data:[
      {
        skill:'Electrician',
        ratePerHour : '0000AED'
      },
      {
        skill:'Electrician',
        ratePerHour : '0000AED'
      },
      {
        skill:'Electrician',
        ratePerHour : '0000AED'
      },
      {
        skill:'Electrician',
        ratePerHour : '0000AED'
      },
      {
        skill:'Electrician',
        ratePerHour : '0000AED'
      }
    ]
  }
  locationTable:TableSetting = {
    columns: [
      {
        lable: 'tables.column.location',
        type: 1,
        field: 'location',
        renderer: 'doubleLineRenderer',
        rendererOptions: {
          line1: 'zip',
          line2: 'address',
          type: 'array'
        }
      },
    ],
    data:[
      {
        location: {
          zip:'0023457687',
          address : 'Bardubai, Street Number 2'
        }
      },
      {
        location: {
          zip:'0023457687',
          address : 'Bardubai, Street Number 2'
        }
      },
      {
        location: {
          zip:'0023457687',
          address : 'Bardubai, Street Number 2'
        }
      },
    ]
  }
  technicalJobCardTable:TableSetting = {
    columns: [
      {
        lable: 'tables.column.asset',
        field: 'asset',
        width: '19em',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'assetsRenderer'
      },
      {
        lable: 'tables.column.priority',
        field: 'priority',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'priorityRenderer'
      },
      {
        lable: 'tables.column.task',
        field: 'task',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.start_date',
        field: 'startDate',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.total_cost',
        field: 'totalCost',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.time_estimate',
        field: 'timeEtimate',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.status',
        field: 'status',
        type: ColumnType.lable,
        thumbField: '',
        renderer: '',
      },
    ],
    data:[
      {
        asset: {
          img: 'assets/thumb.png',
          assetName: 'Request No 123456',
          assetSubName: 'DPD 00000001',
          ownership: 'Repair'
        },
        priority:'high',
        task:'Oil Leaking',
        startDate:'02/02/2020',
        totalCost:'000 AED',
        timeEtimate:'7 hour',
        status:'started',
        statusColor: '#028D5D'
      },
      {
        asset: {
          img: 'assets/thumb.png',
          assetName: 'Request No 123456',
          assetSubName: 'DPD 00000001',
          ownership: 'Repair'
        },
        priority:'high',
        task:'Oil Leaking',
        startDate:'02/02/2020',
        totalCost:'000 AED',
        timeEtimate:'7 hour',
        status:'started',
        statusColor: '#028D5D'
      },
      {
        asset: {
          img: 'assets/thumb.png',
          assetName: 'Request No 123456',
          assetSubName: 'DPD 00000001',
          ownership: 'Repair'
        },
        priority:'high',
        task:'Oil Leaking',
        startDate:'02/02/2020',
        totalCost:'000 AED',
        timeEtimate:'7 hour',
        status:'started',
        statusColor: '#028D5D'
      },
      {
        asset: {
          img: 'assets/thumb.png',
          assetName: 'Request No 123456',
          assetSubName: 'DPD 00000001',
          ownership: 'Repair'
        },
        priority:'high',
        task:'Oil Leaking',
        startDate:'02/02/2020',
        totalCost:'000 AED',
        timeEtimate:'7 hour',
        status:'started',
        statusColor: '#028D5D'
      },
      {
        asset: {
          img: 'assets/thumb.png',
          assetName: 'Request No 123456',
          assetSubName: 'DPD 00000001',
          ownership: 'Repair'
        },
        priority:'high',
        task:'Oil Leaking',
        startDate:'02/02/2020',
        totalCost:'000 AED',
        timeEtimate:'7 hour',
        status:'started',
        statusColor: '#028D5D'
      },
      {
        asset: {
          img: 'assets/thumb.png',
          assetName: 'Request No 123456',
          assetSubName: 'DPD 00000001',
          ownership: 'Repair'
        },
        priority:'high',
        task:'Oil Leaking',
        startDate:'02/02/2020',
        totalCost:'000 AED',
        timeEtimate:'7 hour',
        status:'started',
        statusColor: '#028D5D'
      }
    ]
  }
  technicalActivityTable:TableSetting = {
    columns: [
      {
        lable: 'tables.column.title',
        type: 1,
        field: 'title',
        renderer: 'doubleLineRenderer',
        rendererOptions: {
          line1: 'info',
          line2: 'description',
          type: 'list'
        }
      },
      {
        lable: 'tables.column.date',
        type: 1,
        field: 'date',
        width:'14em',
        renderer: 'doubleLineRenderer',
        rendererOptions: {
          line1: 'date',
          line2: 'time',
          type: 'array'
        }
      },
    ],
    data:[
      {
        title:{
          info:'Job Card Created',
          description:'Asset DPD123456 Assign to This User'
        },
        date:{
          date:'Saturday 02/02',
          time:'12:30'
        },
        statusColor: '#028D5D'
      },
      {
        title:{
          info:'Task Started',
          description:'Asset DPD123456 Assign to This User'
        },
        date:{
          date:'Saturday 02/02',
          time:'12:30'
        },
        statusColor: '#028D5D'
      },
      {
        title:{
          info:'Job Card Created',
          description:'Asset DPD123456 Assign to This User'
        },
        date:{
          date:'Saturday 02/02',
          time:'12:30'
        },
        statusColor: '#028D5D'
      },
      {
        title:{
          info:'Task Started',
          description:'Asset DPD123456 Assign to This User'
        },
        date:{
          date:'Saturday 02/02',
          time:'12:30'
        },
        statusColor: '#028D5D'
      },
      {
        title:{
          info:'Job Card Created',
          description:'Asset DPD123456 Assign to This User'
        },
        date:{
          date:'Saturday 02/02',
          time:'12:30'
        },
        statusColor: '#028D5D'
      },
      {
        title:{
          info:'Task Started',
          description:'Asset DPD123456 Assign to This User'
        },
        date:{
          date:'Saturday 02/02',
          time:'12:30'
        },
        statusColor: '#028D5D'
      },
      {
        title:{
          info:'Job Card Created',
          description:'Asset DPD123456 Assign to This User'
        },
        date:{
          date:'Saturday 02/02',
          time:'12:30'
        },
        statusColor: '#028D5D'
      },
      {
        title:{
          info:'Task Started',
          description:'Asset DPD123456 Assign to This User'
        },
        date:{
          date:'Saturday 02/02',
          time:'12:30'
        },
        statusColor: '#028D5D'
      },
      
    ]
  }
  filterSettingJobCard =  [
    {
      filterTitle: 'statistic.open',
      filterCount: '3450',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.started',
      filterCount: '56',
      filterTagColor: '#009EFF'
    },
    {
      filterTitle: 'statistic.stoped',
      filterCount: '2456',
      filterTagColor: '#FCB614'
    },
    {
      filterTitle: 'statistic.closed',
      filterCount: '2456',
      filterTagColor: '#C543FF'
    },
    {
      filterTitle: 'statistic.delayed',
      filterCount: '12',
      filterTagColor: '#40D3C2'
    }
  ];
  filterSettingActivity =[
    {
      filterTitle: 'statistic.todo',
      filterCount: '2456',
      filterTagColor: '#009EFF'
    },
    {
      filterTitle: 'statistic.doing',
      filterCount: '2456',
      filterTagColor: '#C543FF'
    },
    {
      filterTitle: 'statistic.done',
      filterCount: '12',
      filterTagColor: '#40D3C2'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

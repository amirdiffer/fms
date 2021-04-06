import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting, ColumnType } from '@core/table';

@Component({
  selector: 'anms-technician-overview',
  templateUrl: './technician-overview.component.html',
  styleUrls: ['./technician-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicianOverviewComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  selectedTab = 'overview';
  editIcon='assets/icons/pen.svg';

  skillTable:TableSetting = {
    columns: [
      {
        lable: 'Skill',
        field: 'skill',
        type: 1,
      },
      {
        lable: 'Rate Per Hour',
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
        lable: 'Location',
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
        lable: 'Priority',
        field: 'priority',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'priorityRenderer'
      },
      {
        lable: 'Task',
        field: 'task',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Start Date',
        field: 'startDate',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Totall Cost',
        field: 'totalCost',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Time Estimate',
        field: 'timeEtimate',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Status',
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
        lable: 'Title ',
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
        lable: 'Date ',
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
      filterTitle: 'Open',
      filterCount: '3450',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'Started',
      filterCount: '56',
      filterTagColor: '#009EFF'
    },
    {
      filterTitle: 'Stoped',
      filterCount: '2456',
      filterTagColor: '#FCB614'
    },
    {
      filterTitle: 'Closed',
      filterCount: '2456',
      filterTagColor: '#C543FF'
    },
    {
      filterTitle: 'Delayed',
      filterCount: '12',
      filterTagColor: '#40D3C2'
    }
  ];
  filterSettingActivity =[
    {
      filterTitle: 'To Do',
      filterCount: '2456',
      filterTagColor: '#009EFF'
    },
    {
      filterTitle: 'Doing',
      filterCount: '2456',
      filterTagColor: '#C543FF'
    },
    {
      filterTitle: 'Done',
      filterCount: '12',
      filterTagColor: '#40D3C2'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { TableSetting } from '@core/table';
import { IHistory, IHistoryType } from './history/history.component';
import { IReminders, IRemindersType } from './reminder/reminder.component';

@Component({
  selector: 'anms-sub-asset-overview',
  templateUrl: './sub-asset-overview.component.html',
  styleUrls: ['./sub-asset-overview.component.scss']
})
export class SubAssetOverviewComponent implements OnInit {
  reminderData:IReminders[] =[
    {
      title:'Text Text',
      date:'15 MAR 2019',
      time:'02:08PM',
      type:IRemindersType.over
    },
    {
      title:'Service appointment',
      date:'15 MAR 2019',
      time:'02:08PM',
      type:IRemindersType.normal
    },
    {
      title:'GPS Alert system service',
      date:'15 MAR 2019',
      time:'02:08PM',
      type:IRemindersType.normal
    },
    {
      title:'Monthly check up',
      date:'15 MAR 2019',
      time:'02:08PM',
      type:IRemindersType.normal
    },
    {
      title:'Upgrade tracking sysem',
      date:'15 MAR 2019',
      time:'02:08PM',
      type:IRemindersType.normal
    },
    {
      title:'Sterilization',
      date:'15 MAR 2019',
      time:'02:08PM',
      type:IRemindersType.urgent
    },
    {
      title:'Upgrade tracking system',
      date:'15 MAR 2019',
      time:'02:08PM',
      type:IRemindersType.normal
    }
  ]
  workshopHistoryData:IHistory[]=[
    {
      title:'Repairing the lenses',
      date:'12 SEP 2018',
      time:'02:46PM',
      assign:'Atefe Fazaeli',
      type:IHistoryType.doing
    },
    {
      title:'Repairing the lenses',
      date:'12 SEP 2018',
      time:'02:46PM',
      assign:'Atefe Fazaeli',
      type:IHistoryType.done
    }
    ,
    {
      title:'Repairing the lenses',
      date:'12 SEP 2018',
      time:'02:46PM',
      assign:'Atefe Fazaeli',
      type:IHistoryType.done
    }
    ,
    {
      title:'Repairing the lenses',
      date:'12 SEP 2018',
      time:'02:46PM',
      assign:'Atefe Fazaeli',
      type:IHistoryType.done
    }
    ,
    {
      title:'Repairing the lenses',
      date:'12 SEP 2018',
      time:'02:46PM',
      assign:'Atefe Fazaeli',
      type:IHistoryType.done
    }
  ]
  reviewPlaneSettingTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.depreciation_value',
        type: 1,
        field: 'depreciationValue',
        renderer: ''
      },
      {
        lable: 'tables.column.out_of_policy',
        type: 1,
        field: 'maxUsageYear',
        renderer: ''
      },
      {
        lable: 'tables.column.out_of_policy',
        type: 1,
        field: 'maxUsageKPHour',
        renderer: ''
      }
    ],
    data: [
      {
        depreciationValue:'%20',
        maxUsageYear:'After 5 years',
        maxUsageKPHour:'-'
      },
      {
        depreciationValue:'',
        maxUsageYear:'02/02/2020',
        maxUsageKPHour:'-'
      }
    ]
  };
  reviewPlaneSettingTable2: TableSetting = {
    columns: [
      {
        lable: 'tables.column.year',
        type: 1,
        width: 100,
        field: 'year',
        renderer: ''
      },
      {
        lable: 'tables.column.book_value',
        type: 1,
        field: 'bookValue',
        renderer: ''
      }
    ],
    data: [
      {
        year:1,
        bookValue:'43000 AED'
      },
      {
        year:2,
        bookValue:'39000 AED'
      },
      {
        year:3,
        bookValue:'36000 AED'
      },
      {
        year:4,
        bookValue:'16000 AED'
      },
      {
        year:5,
        bookValue:'0 AED'
      }
    ]
  };

  reviewMaintenancePlan:TableSetting = {
    columns: [
      {
        lable: 'tables.column.intervals',
        type: 1,
        width:'10em' ,
        field: 'intervals',
        renderer: ''
      },
      {
        lable: 'tables.column.service_tasks',
        type: 1,
        field: 'serviceTasks',
        renderer: ''
      },
    ],
    data:[
      {
        intervals:'Every 2 Month',
        serviceTasks:'Engine/Drive Belt(s) Replacement , Transmission Filter'
      },
      {
        intervals:'Every 2 Month',
        serviceTasks:'Engine/Drive Belt(s) Replacement , Transmission Filter'
      },
      {
        intervals:'Every 2 Month',
        serviceTasks:'Engine/Drive Belt(s) Replacement , Transmission Filter'
      }
    ]
  }
  reviewWarrantyPlan:TableSetting = {
    columns: [
      {
        lable: 'tables.column.warranty_for',
        type: 1,
        field: 'item',
        renderer: ''
      },
      {
        lable: 'tables.column.start_date',
        type: 1,
        field: 'startDate',
        renderer: 'dateRenderer'
      },
      {
        lable: 'tables.column.end_date',
        type: 1,
        field: 'endDate',
        renderer: 'dateRenderer'
      },
    ],
    data:[
      {
        item:'Engine',
        startDate:'02/02/2020',
        endDate:'02/02/2020',
      }
    ]
  }
  constructor() { }

  ngOnInit(): void {
  }

}

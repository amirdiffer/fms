import { Component, OnInit } from '@angular/core';
import { TableSetting } from '@core/table';

@Component({
  selector: 'anms-sub-asset-overview',
  templateUrl: './sub-asset-overview.component.html',
  styleUrls: ['./sub-asset-overview.component.scss']
})
export class SubAssetOverviewComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-factory-category',
  templateUrl: './factory-category.component.html',
  styleUrls: ['./factory-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactoryCategoryComponent implements OnInit {
  tableData = [];
  tabbleSetting;
  constructor() {}

  ngOnInit(): void {
    for (let index = 0; index < 5; index++) {
      const el = {
        name: 'Patrol Police',
        totalSubAsset: 123456,
        totalAccesory: 1231546,
        total: 123123
      };
      this.tableData.push(el);
    }

    this.tabbleSetting = {
      columns: [
        {
          lable: 'tables.column.name',
          field: 'name',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.total_sub_asset',
          field: 'totalSubAsset',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.total_accessory',
          field: 'totalAccesory',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.total',
          field: 'total',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: this.tableData
    };
  }
}

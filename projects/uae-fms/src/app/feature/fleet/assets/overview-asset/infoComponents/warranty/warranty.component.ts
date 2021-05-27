import { Component, Input, OnInit } from '@angular/core';
import { ColumnType } from '@core/table';
import moment from 'moment';

@Component({
  selector: 'app-asset-overview-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.scss']
})
export class WarrantyComponent implements OnInit {
  @Input() data = [];

  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';

  tableSetting = {
    columns: [
      {
        lable: 'tables.column.category',
        field: 'category',
        type: ColumnType.lable,
        thumbField: ''
      },
      {
        lable: 'tables.column.item',
        field: 'item',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.mileage_km',
        field: 'mileage_km',
        type: ColumnType.lable,
        width: 300,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.duration',
        field: 'duration',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.start_date',
        field: 'startDate',
        type: ColumnType.lable,
        renderer: 'dateRenderer'
      },
      {
        lable: 'tables.column.start_km',
        field: 'start_km',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      }
    ],
    data: [],
    rowSettings: {}
  };

  constructor() {}

  date(y) {
    let createdDate = moment
      .utc(y * 1000)
      .local()
      .toDate();
    let nowDate = new Date();
    let newDate = nowDate.getTime() - createdDate.getTime();
    return {
      day: Math.floor(newDate / (1000 * 3600 * 24))
    };
  }

  ngOnInit(): void {
    this.tableSetting.data = this.data.map((x) => {
      return {
        category: 'Test',
        item: x['item'],
        mileage_km: '1000 KM',
        duration:
          this.date(x['duration']).day >= 1
            ? this.date(x['duration']).day + ' Days Ago'
            : 'Today',
        startDate: x['startDate'],
        start_km: '128900 KM'
      };
    });
  }
}

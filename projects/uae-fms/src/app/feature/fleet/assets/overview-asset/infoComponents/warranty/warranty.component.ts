import { Component, OnInit } from '@angular/core';
import { ColumnType } from '@core/table';

@Component({
  selector: 'app-asset-overview-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.scss']
})
export class WarrantyComponent implements OnInit {

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
        field: 'start_date',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.start_km',
        field: 'start_km',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
    ],
    data: [
      {
        category: 'Door',
        item: 'Door Handle',
        mileage_km: '1000 KM',
        duration: '2 Years',
        start_date: '02/02/2020',
        start_km: '128900 KM',
      },
      {
        category: 'Door',
        item: 'Door Handle',
        mileage_km: '1000 KM',
        duration: '2 Years',
        start_date: '02/02/2020',
        start_km: '128900 KM',
      },
      {
        category: 'Door',
        item: 'Door Handle',
        mileage_km: '1000 KM',
        duration: '2 Years',
        start_date: '02/02/2020',
        start_km: '128900 KM',
      },
      {
        category: 'Door',
        item: 'Door Handle',
        mileage_km: '1000 KM',
        duration: '2 Years',
        start_date: '02/02/2020',
        start_km: '128900 KM',
      },
      {
        category: 'Door',
        item: 'Door Handle',
        mileage_km: '1000 KM',
        duration: '2 Years',
        start_date: '02/02/2020',
        start_km: '128900 KM',
      },
      {
        category: 'Door',
        item: 'Door Handle',
        mileage_km: '1000 KM',
        duration: '2 Years',
        start_date: '02/02/2020',
        start_km: '128900 KM',
      },
      {
        category: 'Door',
        item: 'Door Handle',
        mileage_km: '1000 KM',
        duration: '2 Years',
        start_date: '02/02/2020',
        start_km: '128900 KM',
      },
      {
        category: 'Door',
        item: 'Door Handle',
        mileage_km: '1000 KM',
        duration: '2 Years',
        start_date: '02/02/2020',
        start_km: '128900 KM',
      },
      {
        category: 'Door',
        item: 'Door Handle',
        mileage_km: '1000 KM',
        duration: '2 Years',
        start_date: '02/02/2020',
        start_km: '128900 KM',
      },
      {
        category: 'Door',
        item: 'Door Handle',
        mileage_km: '1000 KM',
        duration: '2 Years',
        start_date: '02/02/2020',
        start_km: '128900 KM',
      }
    ],
    rowSettings: {}
  };

  constructor() { }

  ngOnInit(): void {
  }

}

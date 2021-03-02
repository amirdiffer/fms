import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FilterCardSetting } from '@core/filter';
import { TableSetting } from '@core/table';

@Component({
  selector: 'anms-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartListComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.available',
      filterCount: '08',
      filterTagColor: '#6870B4',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unavailable',
      filterCount: '02',
      filterTagColor: '#BA7967',
      onActive(index: number) {}
    }
  ];

  partList_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.item',
        type: 1,
        field: 'Item',
        renderer: 'thumbTextRenderer',
        thumbField: 'thumbImage'
      },
      { lable: 'tables.column.quantity', type: 1, field: 'Quantity' },
      { lable: 'tables.column.status', type: 1, field: 'Status' },
      { lable: 'tables.column.total', type: 1, width: 100,field: 'Total' },
      {
        lable: '',
        type: 1,
        field: 'routeLink',
        width: 50,
        renderer: 'routeLinkRenderer'
      }
    ],
    data: [
      {
        id: 1,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED'
      },
      {
        id: 2,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED'
      },
      {
        id: 3,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED'
      },
      {
        id: 4,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED'
      },
      {
        id: 5,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED'
      },
      {
        id: 6,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED'
      },
      {
        id: 7,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED'
      }
    ]
  };
  years = [
    { name: 'Year', value: 'null' },
    { name: '1999', value: '1999' },
    { name: '2000', value: '2000' },
    { name: '2001', value: '2001' },
    { name: '2002', value: '2002' },
    { name: '2003', value: '2003' },
    { name: '2004', value: '2004' },
    { name: '2005', value: '2005' },
    { name: '2006', value: '2006' }
  ];
  models = [
    { name: 'Model', value: 'null' },
    { name: '1999', value: '1999' },
    { name: '2000', value: '2000' },
    { name: '2001', value: '2001' },
    { name: '2002', value: '2002' },
    { name: '2003', value: '2003' },
    { name: '2004', value: '2004' },
    { name: '2005', value: '2005' },
    { name: '2006', value: '2006' }
  ];
  makes = [
    { name: 'Make', value: 'null' },
    { name: '1999', value: '1999' },
    { name: '2000', value: '2000' },
    { name: '2001', value: '2001' },
    { name: '2002', value: '2002' },
    { name: '2003', value: '2003' },
    { name: '2004', value: '2004' },
    { name: '2005', value: '2005' },
    { name: '2006', value: '2006' }
  ];

  constructor() {}

  ngOnInit(): void {}
}

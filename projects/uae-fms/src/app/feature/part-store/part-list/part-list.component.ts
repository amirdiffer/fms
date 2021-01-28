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
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'Total',
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Available',
      filterCount: '08',
      filterTagColor: '#6870B4',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Unavailable',
      filterCount: '02',
      filterTagColor: '#BA7967',
      onActive(index: number) {}
    }
  ];

  partList_Table: TableSetting = {
    columns: [
      {
        lable: 'Item',
        type: 1,
        field: 'Item',
        renderer: 'thumbTextRenderer',
        thumbField: 'thumbImage'
      },
      { lable: 'Quantity', type: 1, field: 'Quantity' },
      { lable: 'Status', type: 1, field: 'Status' },
      { lable: 'Total', type: 1, field: 'Total' }
    ],
    data: [
      {
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED'
      },
      {
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED'
      },
      {
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED'
      },
      {
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED'
      },
      {
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED'
      },
      {
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED'
      },
      {
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED'
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {}
}

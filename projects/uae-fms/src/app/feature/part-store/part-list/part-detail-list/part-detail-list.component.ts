import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';

@Component({
  selector: 'part-detail-list',
  template: `<app-table [setting]="partListDetaisTable"></app-table>`,
  styleUrls: ['./part-detail-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartDetailListComponent implements OnInit {
  recordId: number;
  partListDetaisTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.item',
        type: 1,
        field: 'thumbText',
        renderer: 'thumbTextRenderer',
        thumbField: 'thumbImage'
      },
      {
        lable: 'tables.column.model',
        type: 2,
        field: 'thumbModeText',
        renderer: '',
        thumbField: 'thumbModeImage'
      },
      {
        lable: 'tables.column.quantity',
        type: 1,
        field: 'quantity',
        sortable: true
      },
      { lable: 'tables.column.description', type: 1, field: 'description' },
      {
        lable: 'tables.column.warranty_expire',
        type: 1,
        field: 'warrantyExpire',
        sortable: true
      },
      { lable: 'tables.column.status', type: 1, field: 'status' },
      {
        lable: 'tables.column.cost',
        type: 1,
        width: 120,
        field: 'cost',
        sortable: true
      },
      {
        lable: 'tables.column.total',
        type: 1,
        width: 120,
        field: 'total',
        sortable: true
      },
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
        thumbModeText: 'BMW',
        thumbModeImage: 'bmw.png',
        quantity: '1234',
        description: 'Description is here',
        warrantyExpire: '02/02/2020',
        cost: '123 AED',
        status: 'Available',
        total: '122234 AED',
        statusColor: '#838BCE'
      },
      {
        id: 2,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        thumbModeText: 'BMW',
        thumbModeImage: 'bmw.png',
        quantity: '1234',
        description: 'Description is here',
        warrantyExpire: '02/02/2020',
        cost: '123 AED',
        status: 'Available',
        total: '122234 AED',
        statusColor: '#838BCE'
      },
      {
        id: 3,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        thumbModeText: 'BMW',
        thumbModeImage: 'bmw.png',
        quantity: '1234',
        description: 'Description is here',
        warrantyExpire: '02/02/2020',
        cost: '123 AED',
        status: 'Available',
        total: '122234 AED',
        statusColor: '#838BCE'
      },
      {
        id: 4,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        thumbModeText: 'BMW',
        thumbModeImage: 'bmw.png',
        quantity: '1234',
        description: 'Description is here',
        warrantyExpire: '02/02/2020',
        cost: '123 AED',
        status: 'Available',
        total: '122234 AED',
        statusColor: '#838BCE'
      },
      {
        id: 5,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        thumbModeText: 'BMW',
        thumbModeImage: 'bmw.png',
        quantity: '1234',
        description: 'Description is here',
        warrantyExpire: '02/02/2020',
        cost: '123 AED',
        status: 'Available',
        total: '122234 AED',
        statusColor: '#838BCE'
      },
      {
        id: 6,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        thumbModeText: 'BMW',
        thumbModeImage: 'bmw.png',
        quantity: '1234',
        description: 'Description is here',
        warrantyExpire: '02/02/2020',
        cost: '123 AED',
        status: 'Available',
        total: '122234 AED',
        statusColor: '#838BCE'
      },
      {
        id: 7,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        thumbModeText: 'BMW',
        thumbModeImage: 'bmw.png',
        quantity: '1234',
        description: 'Description is here',
        warrantyExpire: '02/02/2020',
        cost: '123 AED',
        status: 'Available',
        total: '122234 AED',
        statusColor: '#838BCE'
      }
    ],
    rowSettings: {
      onClick: (col, data, button?) => {
        this._router.navigate(['../overview'], {
          relativeTo: this._route,
          queryParams: { id: data.id, categoryId: this.recordId }
        });
      },
      floatButton: [
        {
          button: 'external'
        }
      ]
    }
  };
  constructor(private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      this.recordId = +params.get('id');
    });
  }
}

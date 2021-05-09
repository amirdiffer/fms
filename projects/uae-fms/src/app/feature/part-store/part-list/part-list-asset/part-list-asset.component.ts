import { Component, OnInit } from '@angular/core';
import { PartListFacade } from '../../+state/part-list';
import { FilterCardSetting } from '@core/filter';
import { ColumnType, TableSetting } from '@core/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'anms-part-list-asset',
  templateUrl: './part-list-asset.component.html',
  styleUrls: ['./part-list-asset.component.scss']
})
export class PartListAssetComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  partList = true;
  recordId: number;
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '2456',
      filterTagColor: '#42D0D9',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.available',
      filterCount: '2456',
      filterTagColor: '#20E19D',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.need_to_order',
      filterCount: '2456',
      filterTagColor: '#F2B06E',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unavailable',
      filterCount: '2456',
      filterTagColor: '#AAAAAA',
      onActive(index: number) {}
    }
  ];

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
        statusColor: '#20E19D'
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
        statusColor: '#20E19D'
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
        statusColor: '#20E19D'
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
        statusColor: '#20E19D'
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
        statusColor: '#20E19D'
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
        statusColor: '#20E19D'
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
        statusColor: '#20E19D'
      }
    ],
    rowSettings: {
      onClick: (col, data, button?) => {
        this._router.navigate(['../overview'], {
          relativeTo: this.route,
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

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private route: ActivatedRoute,
    private facade: PartListFacade
  ) {}

  ngOnInit(): void {
    // this.facade.loadAllAsset()
    this.facade.loadAssetStatistics();

    this.facade.assetStatistics$.pipe().subscribe((res) => {
      if (res) {
        console.log(res);
      }
    });

    if (typeof this._activatedRoute.snapshot.params.id != 'undefined') {
      this.partList = false;
      this.filterCard.unshift({
        filterTitle: 'statistic.this_month',
        filterCount: '',
        filterTagColor: '',
        isCalendar: true,
        onActive(index: number) {}
      });
    }
  }
}

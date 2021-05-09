import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterCardSetting } from '@core/filter';
import { ColumnType, TableSetting } from '@core/table';
import { PartListFacade } from '@feature/part-store/+state/part-list';

@Component({
  selector: 'anms-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.scss']
})
export class PartListComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  partList = true;
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.part',
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.available',
      filterSupTitle: 'statistic.part',
      filterCount: '08',
      filterTagColor: '#6870B4',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unavailable',
      filterSupTitle: 'statistic.part',
      filterCount: '02',
      filterTagColor: '#BA7967',
      onActive(index: number) {}
    }
  ];

  partList_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.category',
        type: 1,
        field: 'Item',
        renderer: 'thumbTextRenderer',
        thumbField: 'thumbImage'
      },
      {
        lable: 'tables.column.quantity',
        type: 1,
        field: 'Quantity',
        sortable: true
      },
      { lable: 'tables.column.status', type: 1, field: 'Status' },
      {
        lable: 'tables.column.total',
        type: 1,
        width: 120,
        field: 'Total',
        sortable: true
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [
      {
        id: 1,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED',
        statusColor: '#20E19D'
      },
      {
        id: 2,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED',
        statusColor: '#20E19D'
      },
      {
        id: 3,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED',
        statusColor: '#20E19D'
      },
      {
        id: 4,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED',
        statusColor: '#20E19D'
      },
      {
        id: 5,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED',
        statusColor: '#20E19D'
      },
      {
        id: 6,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED',
        statusColor: '#20E19D'
      },
      {
        id: 7,
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        Quantity: '1234',
        Status: 'Available',
        Total: '122234 AED',
        statusColor: '#20E19D'
      }
    ],
    rowSettings: {
      onClick: (col, data, button?) => {
        this._router.navigate(['category'], {
          relativeTo: this.route,
          queryParams: { id: data.id }
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

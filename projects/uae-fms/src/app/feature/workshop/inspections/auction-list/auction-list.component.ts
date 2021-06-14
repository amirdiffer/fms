import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FilterCardSetting } from '@core/filter';
import { TableSetting } from '@core/table';
import { AuctionListFacade } from '@feature/workshop/+state/auction-list/auction/auction-list.facade';
import { Subscription } from 'rxjs';
import { FakeServiceAuctionList } from './_fake-service.service';

@Component({
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.scss']
})
export class AuctionListComponent implements OnInit, OnDestroy {
  editOpen: boolean = false;
  downloadBtn = 'assets/icons/download-solid.svg';
  editOpen$: Subscription;
  selectedRow = null;
  filterSetting: FilterCardSetting[] = [
    {
      filterCount: '',
      filterTagColor: '',
      filterTitle: 'statistic.this_month',
      filterSupTitle: 'statistic.auction_list',
      isCalendar: true,
      onActive: () => {}
    },
    {
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      filterSupTitle: 'statistic.auction_list',
      filterTitle: 'statistic.total',
      onActive: () => {}
    },
    {
      filterCount: '08',
      filterTagColor: '#6870B4',
      filterSupTitle: 'statistic.auction_list',
      filterTitle: 'statistic.out_of_policy',
      onActive: () => {}
    },
    {
      filterCount: '02',
      filterTagColor: '#BA7967',
      filterSupTitle: 'statistic.auction_list',
      filterTitle: 'statistic.total_lost',
      onActive: () => {}
    },
    {
      filterCount: '09',
      filterTagColor: '#DD5648',
      filterSupTitle: 'statistic.auction_list',
      filterTitle: 'statistic.accident',
      onActive: () => {}
    }
  ];

  settingTable1: TableSetting = {
    columns: [
      {
        lable: 'tables.column.item',
        field: 'item',
        width: '17em',
        renderer: 'vehicleRenderer'
      },
      { lable: 'tables.column.created_by', field: 'createdBy' },
      { lable: 'tables.column.reason', field: 'reason' },
      { lable: 'tables.column.assignment', field: 'assignment' },
      {
        lable: 'tables.column.estimate_market',
        field: 'estimatedMarket',
        sortable: true
      },
      { lable: 'tables.column.date', field: 'date', sortable: true },
      { lable: 'tables.column.location', field: 'location' },
      {
        lable: 'tables.column.remove_item',
        field: 'removeItem',
        width: 100,
        renderer: 'booleanRenderer'
      }
    ],
    data: [],
    rowSettings: {
      onClick: (data) => {
        if (data.id) this.selectedRow = data;
      }
    }
  };

  settingTable2: TableSetting = {
    columns: [
      {
        lable: 'tables.column.item',
        field: 'item',
        width: '17em',
        renderer: 'vehicleRenderer'
      },
      { lable: 'tables.column.buyer', field: 'buyer' },
      { lable: 'tables.column.assigned_to', field: 'assignedTo' },
      {
        lable: 'tables.column.actual_market_value',
        field: 'actualMarketValue'
      },
      { lable: 'tables.column.date', field: 'date' },
      { lable: 'tables.column.description', field: 'description' },
      { lable: 'tables.column.cost', field: 'cost', width: 120, sortable: true }
    ],
    data: [
      {
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        buyer: 'Sam Smith',
        assignedTo: 'Sam Smith',
        actualMarketValue: '1111111 AED',
        date: '02/02/2020',
        description: 'Description is here',
        cost: '000 AED'
      },
      {
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        buyer: 'Sam Smith',
        assignedTo: 'Sam Smith',
        actualMarketValue: '1111111 AED',
        date: '02/02/2020',
        description: 'Description is here',
        cost: '000 AED'
      },
      {
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        buyer: 'Sam Smith',
        assignedTo: 'Sam Smith',
        actualMarketValue: '1111111 AED',
        date: '02/02/2020',
        description: 'Description is here',
        cost: '000 AED'
      },
      {
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        buyer: 'Sam Smith',
        assignedTo: 'Sam Smith',
        actualMarketValue: '1111111 AED',
        date: '02/02/2020',
        description: 'Description is here',
        cost: '000 AED'
      },
      {
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        buyer: 'Sam Smith',
        assignedTo: 'Sam Smith',
        actualMarketValue: '1111111 AED',
        date: '02/02/2020',
        description: 'Description is here',
        cost: '000 AED'
      },
      {
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        buyer: 'Sam Smith',
        assignedTo: 'Sam Smith',
        actualMarketValue: '1111111 AED',
        date: '02/02/2020',
        description: 'Description is here',
        cost: '000 AED'
      }
    ]
  };

  constructor(
    private _facade: AuctionListFacade,
    private _fake_serviceservice: FakeServiceAuctionList,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.editOpen$ = this._fake_serviceservice.getEdit().subscribe((open) => {
      this.editOpen = open;
    });
    this._facade.message$.subscribe((x) => {
      this.settingTable1.data = x;
    });
  }
  ngOnDestroy() {
    this.editOpen$.unsubscribe();
  }

  submitSold() {
    this._facade.updateRow(this.selectedRow);
    this._router.navigate([], { queryParams: { id: 'soldTab' } });
  }
}

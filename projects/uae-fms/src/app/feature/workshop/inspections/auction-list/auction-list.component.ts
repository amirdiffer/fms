import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FilterCardSetting } from '@core/filter';
import { TableSetting } from '@core/table';
import { AuctionListFacade } from '@feature/workshop/+state/auction-list';
import { Subscription } from 'rxjs';
import { FakeServiceAuctionList } from './_fake-service.service';

@Component({
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuctionListComponent implements OnInit , OnDestroy{
  editOpen: boolean = false;
  downloadBtn= 'assets/icons/download-solid.svg';
  editOpen$: Subscription;
  filterSetting: FilterCardSetting[] = [
    {
      filterCount: '',
      filterTagColor: '',
      filterTitle: 'This Month',
      isCalendar: true,
      onActive: () => {}
    },
    {
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      filterTitle: 'Total',
      onActive: () => {}
    },
    {
      filterCount: '08',
      filterTagColor: '#6870B4',
      filterTitle: 'Out of Policy',
      onActive: () => {}
    },
    {
      filterCount: '02',
      filterTagColor: '#BA7967',
      filterTitle: 'Total lost',
      onActive: () => {}
    },
    {
      filterCount: '09',
      filterTagColor: '#DD5648',
      filterTitle: 'Accident',
      onActive: () => {}
    }
  ];

  settingTable1: TableSetting = {
    columns: [
      { lable: 'Item', field: 'item', renderer: 'vehicleRenderer' },
      { lable: 'Created by', field: 'createdBy' },
      { lable: 'Reason', field: 'reason', width: 100 },
      { lable: 'Assignment', field: 'assignment' },
      { lable: 'Estimated Market Va..', field: 'estimatedMarket' },
      { lable: 'Date', field: 'date' },
      { lable: 'Location', field: 'location', width: 120 },
      {
        lable: 'Remove Item',
        field: 'removeItem',
        width: 100,
        renderer: 'booleanRenderer'
      }
    ],
    data: [
      {
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        createdBy: 'Automatic',
        reason: 'Out Of Policy',
        assignment: 'Sam Smith, Sam Smith',
        estimatedMarket: '1111111 AED',
        date: '02/02/2020',
        location: 'Bardubai, Dubai',
        removeItem: true
      },
      {
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        createdBy: 'Automatic',
        reason: 'Out Of Policy',
        assignment: 'Sam Smith, Sam Smith',
        estimatedMarket: '1111111 AED',
        date: '02/02/2020',
        location: 'Bardubai, Dubai',
        removeItem: false
      },
      {
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        createdBy: 'Automatic',
        reason: 'Out Of Policy',
        assignment: 'Sam Smith, Sam Smith',
        estimatedMarket: '1111111 AED',
        date: '02/02/2020',
        location: 'Bardubai, Dubai',
        removeItem: false
      },
      {
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        createdBy: 'Automatic',
        reason: 'Out Of Policy',
        assignment: 'Sam Smith, Sam Smith',
        estimatedMarket: '1111111 AED',
        date: '02/02/2020',
        location: 'Bardubai, Dubai',
        removeItem: true
      },
      {
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        createdBy: 'Automatic',
        reason: 'Out Of Policy',
        assignment: 'Sam Smith, Sam Smith',
        estimatedMarket: '1111111 AED',
        date: '02/02/2020',
        location: 'Bardubai, Dubai',
        removeItem: true
      },
      {
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        createdBy: 'Automatic',
        reason: 'Out Of Policy',
        assignment: 'Sam Smith, Sam Smith',
        estimatedMarket: '1111111 AED',
        date: '02/02/2020',
        location: 'Bardubai, Dubai',
        removeItem: true
      }
    ]
  };

  settingTable2: TableSetting = {
    columns: [
      { lable: 'Item', field: 'item', renderer: 'vehicleRenderer' },
      { lable: 'Buyer', field: 'buyer' },
      { lable: 'Assigned to', field: 'assignedTo' },
      { lable: 'Actual Market Value', field: 'actualMarketValue' },
      { lable: 'Date', field: 'date' },
      { lable: 'Description', field: 'description' },
      { lable: 'Cost', field: 'cost', width: 90 }
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

  constructor(private _facade: AuctionListFacade , private _fake_serviceservice : FakeServiceAuctionList) {}

  ngOnInit(): void {
    this.editOpen$ = this._fake_serviceservice
      .getEdit()
      .subscribe((open) => {
        this.editOpen = open;
      });
    this._facade.loadAll();
  }
  ngOnDestroy(){
    this.editOpen$.unsubscribe();
  }
}

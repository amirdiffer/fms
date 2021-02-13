import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FilterCardSetting } from '@core/filter/filter.component';
import { TableSetting } from '@core/table';
import { Subscription } from 'rxjs';
import { AccessoryService } from './accessory.service';

@Component({
  selector: 'anms-accessory',
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessoryComponent implements OnInit , OnDestroy{
  downloadBtn= 'assets/icons/download-solid.svg';
  openAdd;
  openAdd$:Subscription;
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'Total',
      filterCount: '2456',
      filterTagColor: '#CBA786',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Available',
      filterCount: '356',
      filterTagColor: '#07858D',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Assigned',
      filterCount: '124',
      filterTagColor: '#EF959D',
      onActive(index: number) {}
    },
    {
      filterTitle: 'X Accessory',
      filterCount: '12',
      filterTagColor: '#DD5648',
      onActive(index: number) {}
    }
  ];

  accessory_Table: TableSetting = {
    columns: [
      { lable: 'Item', type: 1, field: 'Item' },
      { lable: 'Type', type: 1, field: 'Type' },
      { lable: 'Asset/Sub Asset', type: 1, field: 'Asset_SubAsset' },
      { lable: 'Assigned To', type: 1, field: 'Assigned_To' },
      { lable: 'Quantity', type: 1, field: 'Quantity', width: 100 }
    ],
    data: [
      {
        statusColor: '#00AFB9',
        Item: 'Sticker',
        Type: 'Name is here',
        Asset_SubAsset: 'Item 122334',
        Assigned_To: 'Unassigned',
        Quantity: '2'
      },
      {
        statusColor: '#00AFB9',
        Item: 'Sticker',
        Type: 'Name is here',
        Asset_SubAsset: 'Item 122334',
        Assigned_To: 'Unassigned',
        Quantity: '2'
      },
      {
        statusColor: '#00AFB9',
        Item: 'Sticker',
        Type: 'Name is here',
        Asset_SubAsset: 'Item 122334',
        Assigned_To: 'Unassigned',
        Quantity: '2'
      },
      {
        statusColor: '#00AFB9',
        Item: 'Sticker',
        Type: 'Name is here',
        Asset_SubAsset: 'Item 122334',
        Assigned_To: 'Unassigned',
        Quantity: '2'
      },
      {
        statusColor: '#00AFB9',
        Item: 'Sticker',
        Type: 'Name is here',
        Asset_SubAsset: 'Item 122334',
        Assigned_To: 'Unassigned',
        Quantity: '2'
      },
      {
        statusColor: '#00AFB9',
        Item: 'Sticker',
        Type: 'Name is here',
        Asset_SubAsset: 'Item 122334',
        Assigned_To: 'Unassigned',
        Quantity: '2'
      }
    ]
  };

  constructor(private _accessoryService:AccessoryService) {}

  ngOnInit(): void {
    this.openAdd$ = this._accessoryService.getAddForm().subscribe(
      (open) => {
        this.openAdd =  open
      }
    )
  }

  addAccessory(){
    this._accessoryService.loadAddForm(true);
    console.log('OK')
  }

  ngOnDestroy(){
    this.openAdd$.unsubscribe();
  }
}

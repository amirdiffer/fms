import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { FilterCardSetting } from '@core/filter/filter.component';
import { TableSetting } from '@core/table';
import { Subscription } from 'rxjs';
import { AccessoryFacade } from '../+state/accessory';
import { AccessoryService } from './accessory.service';

@Component({
  selector: 'anms-accessory',
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessoryComponent implements OnInit, OnDestroy {
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  openAdd;
  openAdd$: Subscription;
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '',
      filterTagColor: '#CBA786',
      field: 'total',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.available',
      filterCount: '',
      filterTagColor: '#07858D',
      field: 'available',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.assigned',
      filterCount: '',
      filterTagColor: '#EF959D',
      field: 'assigned',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.x_accessory',
      filterCount: '',
      filterTagColor: '#DD5648',
      field: 'xAccesssory',
      onActive(index: number) {}
    }
  ];

  accessory_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.item', type: 1, field: 'Item' },
      { lable: 'tables.column.type', type: 1, field: 'Type' },
      {
        lable: 'tables.column.asset_sub_asset',
        type: 1,
        field: 'Asset_SubAsset'
      },
      { lable: 'tables.column.assigned_to', type: 1, field: 'Assigned_To' },
      {
        lable: 'tables.column.quantity',
        type: 1,
        field: 'Quantity',
        width: 150
      }
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

  ngOnInit(): void {
    this.openAdd$ = this._accessoryService.getAddForm().subscribe((open) => {
      this.openAdd = open;
    });
    this._accessoryFacade.loadAll();

    this._accessoryFacade.accessory$.subscribe((x) => {
      console.log(x)
    })

    this._accessoryFacade.loadStatistics();
    this._accessoryFacade.statistics$.subscribe((data) => {
      console.log(data, 'accessory statistics');
      if (data) {
        this.filterCard.forEach((card, index) => {
          this.filterCard[index].filterCount = data[this.filterCard[index].field]
        })
      }
    });

  }

  constructor(
    private _accessoryService: AccessoryService,
    private _accessoryFacade: AccessoryFacade
  ) {}

  addAccessory() {
    this._accessoryService.loadAddForm(true);
    console.log('OK');
  }

  ngOnDestroy() {
    this.openAdd$.unsubscribe();
  }
}

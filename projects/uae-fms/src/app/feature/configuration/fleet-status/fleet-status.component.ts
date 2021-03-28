import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FleetStatusAssetFacade,
  FleetStatusSubAssetFacade
} from '../+state/fleet-status';
import { TableSetting } from '@core/table';
import { Router } from '@angular/router';

@Component({
  selector: 'anms-fleet-status',
  templateUrl: './fleet-status.component.html',
  styleUrls: ['./fleet-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FleetStatusComponent implements OnInit {
  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn = 'assets/icons/download-solid.svg';
  tableSetting: TableSetting = {
    columns: [
      {
        lable: 'tables.column.status_category',
        field: 'Status_Category',
        type: 1
      },
      {
        lable: 'tables.column.status',
        field: 'status',
        type: 1
      },
      {
        lable: 'tables.column.tag',
        field: 'tag',
        type: 1
      },
      {
        lable: 'tables.column.usage',
        field: 'usage',
        type: 1
      }
    ],
    data: [
      {
        statusColor: '#009EFF',
        Status_Category: 'Inactive',
        status: 'Storage, Registration, Workshop',
        tag: 'Wait Permission',
        usage: '23345'
      },
      {
        statusColor: '#FCB614',
        Status_Category: 'Active',
        status: 'Available, Reuse',
        tag: 'Assigned',
        usage: '23345'
      },
      {
        statusColor: '#FE5F4F',
        Status_Category: 'X Fleet',
        status: 'End Contract, Total Loss, Auction',
        tag: 'Sell',
        usage: '23345'
      }
    ]
  };
  selectedTab: string;

  constructor(
    private fleetStatusAssetFacade: FleetStatusAssetFacade,
    private fleetStatusSubAssetFacade: FleetStatusSubAssetFacade,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.fleetStatusAssetFacade.loadAll();
    this.fleetStatusSubAssetFacade.loadAll();
  }
  addClicked(e: Event) {
    switch (this.selectedTab) {
      case 'fleetStatusAssetTab':
        this._router.navigate(['configuration/fleet-status/add-fleet-status']);
        break;
      case 'fleetStatusSubAssetTab':
        this._router.navigate(['configuration/fleet-status/add-fleet-status'], {
          queryParams: { id: 'fleetStatusSubAssetTab' }
        });
        break;
      default:
        this._router.navigate(['configuration/fleet-status']);
        break;
    }
  }
}

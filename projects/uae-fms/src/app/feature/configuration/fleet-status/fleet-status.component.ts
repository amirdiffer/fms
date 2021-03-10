import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FleetStatusAssetFacade,
  FleetStatusSubAssetFacade
} from '../+state/fleet-status';
import { TableSetting } from '@core/table';

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

  constructor(
    private fleetStatusAssetFacade: FleetStatusAssetFacade,
    private fleetStatusSubAssetFacade: FleetStatusSubAssetFacade
  ) {}

  ngOnInit(): void {
    this.fleetStatusAssetFacade.loadAll();
    this.fleetStatusSubAssetFacade.loadAll();

    this.fleetStatusAssetFacade.fleetStatus$.subscribe((response) => {
      console.log(response);
      if (response) {
        this.tableSetting.data = [];
        response.map((responseObject) => {
          const asset = {
            statusColor: '#FE5F4F',
            Status_Category: responseObject.category,
            status: responseObject.status,
            tag: responseObject.tag,
            usage: responseObject.totalCount
          };
          if (responseObject.category.toLowerCase() === 'active') {
            asset.statusColor = '#FCB614';
          } else if (responseObject.category.toLowerCase() === 'inactive') {
            asset.statusColor = '#009EFF';
          } else {
            asset.statusColor = '#FE5F4F';
          }
          this.tableSetting.data.push(asset);
        });
      }
    });

    this.fleetStatusSubAssetFacade.fleetStatus$.subscribe((response) => {
      console.log(response);
    });
  }
}

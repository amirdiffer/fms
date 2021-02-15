import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableSetting } from '@core/table';
import { FleetStatusFacade } from '../+state/fleet-status';

@Component({
  selector: 'anms-fleet-status',
  templateUrl: './fleet-status.component.html',
  styleUrls: ['./fleet-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FleetStatusComponent implements OnInit {
  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn= 'assets/icons/download-solid.svg';
  tableSetting: TableSetting = {
    columns: [
      {
        lable: 'Status Category',
        field: 'Status_Category',
        type: 1
      },
      {
        lable: 'status',
        field: 'status',
        type: 1
      },
      {
        lable: 'tag',
        field: 'tag',
        type: 1
      },
      {
        lable: 'usage',
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


  constructor(private facade: FleetStatusFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }
}

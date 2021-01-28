import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  FleetStatusDataType,
  FleetStatusTableColumnDefinition,
  FleetStatusTableData,
  FleetStatusTableSetting
} from '@feature/configuration/fleet-status/fleet-status-table/fleet-status-asset-table.component';

@Component({
  selector: 'anms-fleet-status',
  templateUrl: './fleet-status.component.html',
  styleUrls: ['./fleet-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FleetStatusComponent implements OnInit {
  faSearch = faSearch;

  tableColumns: FleetStatusTableColumnDefinition[] = [
    {
      title: 'Status Category',
      dataFieldKey: FleetStatusDataType.statusCategory
    },
    {
      title: 'Status',
      dataFieldKey: FleetStatusDataType.status
    },
    {
      title: 'Tag',
      dataFieldKey: FleetStatusDataType.tag
    },
    {
      title: 'Usage',
      dataFieldKey: FleetStatusDataType.usage
    }
  ];

  tableData: FleetStatusTableData[] = [
    {
      statusCategory: {
        leftTagColor: '#009EFF',
        dotColor: '#009EFF',
        statusCategoryName: 'Inactive'
      },
      status: 'Storage, Registration, Workshop',
      tag: 'Wait Permission',
      usage: '23345'
    },
    {
      statusCategory: {
        leftTagColor: '#FCB614',
        dotColor: '#FCB614',
        statusCategoryName: 'Active'
      },
      status: 'Available, Reuse',
      tag: 'Assigned',
      usage: '23345'
    },
    {
      statusCategory: {
        leftTagColor: '#FE5F4F',
        dotColor: '#FE5F4F',
        statusCategoryName: 'X Fleet'
      },
      status: 'End Contract, Total Loss, Auction',
      tag: 'Sell',
      usage: '23345'
    }
  ];

  tableSetting: FleetStatusTableSetting = {
    columns: this.tableColumns,
    data: this.tableData
  };

  constructor() {}

  ngOnInit(): void {}
}

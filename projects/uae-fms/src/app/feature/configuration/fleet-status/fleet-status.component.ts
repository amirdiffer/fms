import { Component, OnInit } from '@angular/core';
import { FleetStatusAssetFacade } from '../+state/fleet-status/asset';
import { FleetStatusSubAssetFacade } from '../+state/fleet-status/sub-asset';
import { ColumnType, TableSetting } from '@core/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'anms-fleet-status',
  templateUrl: './fleet-status.component.html',
  styleUrls: ['./fleet-status.component.scss']
})
export class FleetStatusComponent implements OnInit {
  //#region Table
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
    data: [],
    rowSettings: {
      onClick: (event) => {},
      floatButton: [
        {
          button: 'edit',
          onClick: (col, data) => {
            this._router.navigate([
              'configuration/fleet-status/edit-fleet-status/' + data.id
            ]);
          }
        }
      ]
    }
  };

  asset$ = this.fleetStatusAssetFacade.fleetStatus$.pipe(
    map((x) =>
      x.map((responseObject) => {
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
      })
    )
  );
  //#endregion

  //#region Variables
  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn = 'assets/icons/download-solid.svg';
  selectedTab: string;
  //#endregion

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

  eventPagination() {
    this.fleetStatusAssetFacade.loadAll();
  }
}

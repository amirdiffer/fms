import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FilterCardSetting } from '@core/filter/filter.component';
import { ColumnType, TableComponent, TableSetting } from '@core/table';
import { SubAssetFacade } from '../+state/sub-asset';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TableFacade } from '@core/table/+state/table.facade';
import moment from 'moment';

@Component({
  selector: 'anms-sub-asset',
  templateUrl: './sub-asset.component.html',
  styleUrls: ['./sub-asset.component.scss']
})
export class SubAssetComponent implements OnInit, OnDestroy {

  #startRegionVariables
  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  statisticsSubscription!: Subscription;
  downloadBtn = 'assets/icons/download-solid.svg';
  #endRegionVariables

  //#region filter
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '',
      filterTagColor: '#C543FF',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '',
      filterTagColor: '#4462A2',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '',
      filterTagColor: '#40D3C2',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.x_sub_asset',
      filterCount: '',
      filterTagColor: '#F75A4A',
      onActive(index: number) {}
    }
  ];
  //#endregion


  //#region Table
  data$ = this.facade.subAsset$.pipe(
    map((x) => {
      return x.map((y) => {
        function date() {
          let createdDate = moment.utc(y.createdAt).local().toDate();
          let nowDate = new Date();
          let newDate = nowDate.getTime() - createdDate.getTime();
          return {
            day: Math.floor(newDate / (1000 * 3600 * 24))
          };
        }
        return {
          id: y.id,
          avatarId: y.avatarId,
          MakeName: y.makeName,
          Model: y.modelName,
          Policy: y.policyTypeName,
          Warranty_Expire_Date: y.warrantyExpireDate,
          Serial_Number: y.dpd,
          Asset: y.assetTypeName,
          Date:
            date().day > 0
              ? date().day == 1
                ? `${date().day} Yesterday`
                : `${date().day} Days Ago`
              : 'Today',
          thumbField_Make: 'bmw.png'
        };
      });
    })
  );
  assetTraffic_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.serial_number',
        type: 2,
        field: 'Serial_Number',
        thumbField: 'avatarId',
        // override: 'thumb.png',
        width: '18em'
      },
      { lable: 'tables.column.date', type: 1, field: 'Date' },
      {
        lable: 'tables.column.make',
        type: 1,
        field: 'MakeName'
      },
      { lable: 'tables.column.model', type: 1, field: 'Model' },
      { lable: 'tables.column.policy', type: 1, field: 'Policy' },
      { lable: 'tables.column.asset_type', type: 1, field: 'Asset' },
      {
        lable: 'tables.column.warranty_expire_date',
        type: 1,
        field: 'Warranty_Expire_Date',
        width: 200
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
      floatButton: [
        {
          onClick: (col, data) => {
            this.router.navigate(['/fleet/sub-asset/edit-sub-asset/' + data['id']]);
          },
          button: 'edit',
          color: '#3F3F3F'
        }
      ]
    }
  };
  //#endregion

  constructor(
    private facade: SubAssetFacade,
    private router: Router,
    private _tableFacade: TableFacade
  ) {}

  ngOnInit(): void {
    this.facade.loadAll();
    this.facade.loadStatistics();
    this.statisticsSubscription = this.facade.statistics$.subscribe(
      (res: any) => {
        if (res) {
          const m = res.message;
          this.filterCard = [
            {
              filterTitle: 'statistic.total',
              filterCount: `${m.total}`,
              filterTagColor: '#C543FF',
              onActive(index: number) {}
            },
            {
              filterTitle: 'statistic.active',
              filterCount: `${m.active}`,
              filterTagColor: '#4462A2',
              onActive(index: number) {}
            },
            {
              filterTitle: 'statistic.inactive',
              filterCount: `${m.inactive}`,
              filterTagColor: '#40D3C2',
              onActive(index: number) {}
            },
            {
              filterTitle: 'statistic.x_sub_asset',
              filterCount: `${m.xsubAsset}`,
              filterTagColor: '#F75A4A',
              onActive(index: number) {}
            }
          ];
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.statisticsSubscription?.unsubscribe();
  }

  exportTable() {
    this.table.exportTable(this.assetTraffic_Table, 'Sub Asset');
  }

  eventPagination() {
    this.facade.loadAll();
  }
}

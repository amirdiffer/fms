import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { FilterCardSetting } from '@core/filter/filter.component';
import { ColumnType, TableComponent, TableSetting } from '@core/table';
import { SubAssetFacade } from '../+state/sub-asset';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'anms-sub-asset',
  templateUrl: './sub-asset.component.html',
  styleUrls: ['./sub-asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubAssetComponent implements OnInit, OnDestroy {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  statisticsSubscription!: Subscription;

  downloadBtn = 'assets/icons/download-solid.svg';

  //#region Filter
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
        return {
          id: y.id,
          avatarId: y.avatarId,
          Make: y.makeName,
          Model: y.modelName,
          Policy: y.policyTypeName,
          Warranty_Expire_Date: y.warrantyExpireDate,
          Serial_Number: y.dpd,
          Asset: y.assetTypeName,
          Date: '2 Days ago',
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
        width: '18em'
      },
      { lable: 'tables.column.date', type: 1, field: 'Date' },
      {
        lable: 'tables.column.make',
        type: 1,
        field: 'Make',
        thumbField: 'thumbField_Make',
        renderer: 'companyRenderer'
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
      onClick: (col, data, button?) => {
        console.log(col, data, button);
      },
      floatButton: [
        {
          onClick: (col, data) => {
            console.log(data);
            this.router.navigate(['/fleet/sub-asset/edit-sub-asset'], {
              queryParams: { id: data['id'] }
            });
          },
          button: 'external',
          color: '#3F3F3F'
        }
      ]
    }
  };
  //#endregion

  constructor(
    private facade: SubAssetFacade,
    private router: Router,
    private changeDetector: ChangeDetectorRef
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
          this.changeDetector.detectChanges();
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
}

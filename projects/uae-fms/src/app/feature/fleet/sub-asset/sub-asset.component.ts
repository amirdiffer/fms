import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { FilterCardSetting } from '@core/filter/filter.component';
import { ColumnType, TableSetting } from '@core/table';
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
  statisticsSubscription!: Subscription;

  downloadBtn = 'assets/icons/download-solid.svg';
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '2456',
      filterTagColor: '#C543FF',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '356',
      filterTagColor: '#4462A2',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '124',
      filterTagColor: '#40D3C2',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.x_sub_asset',
      filterCount: '12',
      filterTagColor: '#F75A4A',
      onActive(index: number) {}
    }
  ];

  data$ = this.facade.subAsset$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          id: y.id,
          Make: y.makeName,
          Model: y.modelName,
          Policy: y.policyTypeName,
          Warranty_Expire_Date: y.warrantyExpireDate,
          Serial_Number: y.dpd,
          Asset: y.assetTypeName,
          Date: y.assetTypeName,
          thumbField_Make: 'bmw.png',
          thumbField: 'thumb1.png'
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
        thumbField: 'thumbField'
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

  constructor(private facade: SubAssetFacade, private router: Router) {}

  ngOnInit(): void {
    this.facade.loadAll();
    this.facade.loadStatistics();

    this.facade.subAsset$.subscribe((x) => {
      console.log(x);
    });

    this.statisticsSubscription = this.facade.statistics$.subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  ngOnDestroy(): void {
    this.statisticsSubscription?.unsubscribe();
  }
}

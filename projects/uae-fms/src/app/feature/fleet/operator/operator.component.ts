import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FilterCardSetting } from '@core/filter/filter.component';
import { assetsPath } from '@environments/environment';
import { ColumnType, TableSetting } from '@core/table';
import { OperatorFacade } from '../+state/operator';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperatorComponent implements OnInit {
  assets = assetsPath;
  downloadBtn = 'assets/icons/download-solid.svg';
  showOverView = false;

  //#region Filter
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '2456',
      filterTagColor: '#6C7198',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '356',
      filterTagColor: '#5B8972',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.vacation',
      filterCount: '124',
      filterTagColor: '#DDB16C',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '12',
      filterTagColor: '#E07A5F',
      onActive(index: number) { }
    }
  ];
  filterCardOverView: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '2456',
      filterTagColor: '#6C7198',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '356',
      filterTagColor: '#5B8972',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.vacation',
      filterCount: '124',
      filterTagColor: '#DDB16C',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '12',
      filterTagColor: '#E07A5F',
      onActive(index: number) { }
    }
  ];
  //#endregion

  data$ = this._operatorFacade.operator$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          Operator: y.firstName + ' ' + y.lastName,
          Organization: y.department,
          Information: { line1: y.emails[0], line2: y.phoneNumbers[0] },
          Type: 'Operator',
          Status: 'Active',
          asset: { img: "thumb1.png" },
          TF_PAid: 0,
          TF_Unpaid: 0
        };
      });
    })
  );

  operator_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.operator',
        type: 1,
        field: 'Operator',
        width: 150,
        renderer: 'userRenderer',
        thumbField: 'profilePicture'
      },
      {
        lable: 'tables.column.organization',
        type: 1,
        field: 'Organization',
        width: 150,
        renderer: 'doubleLineRenderer'
      },
      {
        lable: 'tables.column.information',
        type: 1,
        field: 'Information',
        width: 150,
        renderer: 'doubleLineRenderer'
      },
      { lable: 'tables.column.type', type: 1, field: 'Type', width: 100 },
      { lable: 'tables.column.status', type: 1, field: 'Status', width: 100 },
      {
        lable: 'tables.column.asset',
        type: 1,
        field: 'asset',
        width: 180,
        renderer: 'assetsRenderer',
        thumbField: 'assetPicture'
      },
      {
        lable: 'tables.column.tf_paid',
        type: 1,
        field: 'TF_PAid',
        width: 100,
        sortable: true
      },
      {
        lable: 'tables.column.tf_unpaid',
        type: 1,
        field: 'TF_Unpaid',
        width: 100,
        sortable: true
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
        // if ('external') {
        //   this.showOverView = true;
        // }
      },
      floatButton: [
        {
          button: 'edit',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            console.log(data);
            this._router.navigate(['/fleet/operator/edit-operator/' + data.id]);
          }
        },
        {
          button: 'external',
          onClick: (col, data) => {
            this._router.navigate(['/fleet/operator/' + data.id]);
          }
        }
      ]
    }
  };

  constructor(
    private _operatorFacade: OperatorFacade,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._operatorFacade.loadAll();
  }
}

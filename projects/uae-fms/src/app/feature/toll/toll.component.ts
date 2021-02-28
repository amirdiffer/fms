import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TollFacade } from '../toll/+state';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'anms-toll',
  templateUrl: './toll.component.html',
  styleUrls: ['./toll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TollComponent implements OnInit {
  tableSetting;
  tableData: ITableData[];
  filterSetting = [];
  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn = 'assets/icons/download-solid.svg';
  assignForm: object|null = null;

  translations = {
    'statistic.total': '',
    'statistic.available': '',
    'statistic.assigned': ''
  };

  form: FormGroup;
  migrateForm(): void {
    this.form = this._fb.group({
      tag: "",
      status: "",
      purshateDate: ""
    })
  }

  constructor(private facade: TollFacade, private _fb: FormBuilder) {
    this.migrateForm();
  }

  ngOnInit(): void {
    this.facade.loadAll();
    this.facade.assignNow$.subscribe((x) => {
      this.assignForm = x;
      x!=null ? this.form.patchValue(this.assignForm): null;
    });
    this.tableData = [
      {
        tag: '123456789',
        status: 'Unassigned',
        assets: { assetName: 'Asset Name', subAsset: 'Sub Asset' },
        purshateDate: '02/02/2020'
      },
      {
        tag: '123456789',
        status: 'Assigned',
        assets: { assetName: 'Asset Name', subAsset: 'Sub Asset' },
        purshateDate: '02/02/2020'
      },
      {
        tag: '123456789',
        status: 'Assigned',
        assets: { assetName: 'Asset Name', subAsset: 'Sub Asset' },
        purshateDate: '02/02/2020'
      },
      {
        tag: '123456789',
        status: 'Assigned',
        assets: { assetName: 'Asset Name', subAsset: 'Sub Asset' },
        purshateDate: '02/02/2020'
      },
      {
        tag: '123456789',
        status: 'Assigned',
        assets: { assetName: 'Asset Name', subAsset: 'Sub Asset' },
        purshateDate: '02/02/2020'
      }
    ];
    this.tableSetting = {
      columns: [
        {
          lable: 'tables.column.toll_tag',
          field: 'tag',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.status',
          field: 'status',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'sidebar.fleets.assets',
          field: 'assets',
          width: 300,
          type: 2,
          thumbField: '',
          renderer: 'assignNow'
        },
        {
          lable: 'tables.column.purshate_date',
          field: 'purshateDate',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: this.tableData
    };

    this.filterSetting = [
      {
        filterTitle: 'statistic.total',
        filterCount: '2456',
        filterTagColor: '#CBA786'
      },
      {
        filterTitle: 'statistic.available',
        filterCount: '356',
        filterTagColor: '#00AFB9'
      },
      {
        filterTitle: 'statistic.assigned',
        filterCount: '124',
        filterTagColor: '#EF959D'
      }
    ];
  }

  closeForm(): void {
    this.form.reset();
    this.facade.loadAssignNow(null);
  }

  lengthObjectAssign(): boolean {
    if (this.assignForm == null)
      return false
    else
      return Object.keys(this.assignForm).length > 1;
  }

}

export interface ITableData {
  tag: string;
  status: string;
  assets: {
    assetName: string;
    subAsset: string;
  };
  purshateDate: string;
}

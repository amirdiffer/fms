import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TollFacade } from '../toll/+state';

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

  translations = {
    'statistic.total': '',
    'statistic.available': '',
    'statistic.assigned': ''
  };

  constructor(private facade: TollFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();
    this.tableData = [
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
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.status',
          field: 'status',
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'sidebar.fleets.assets',
          field: 'assets',
          type: 2,
          thumbField: '',
          renderer: 'subtextRenderer'
        },
        {
          lable: 'tables.column.purshate_date',
          field: 'purshateDate',
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

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';
import {
  AssetPolicyFacade,
  SubAssetPolicyFacade
} from '../+state/asset-policy';

@Component({
  selector: 'anms-asset-policy',
  templateUrl: './asset-policy.component.html',
  styleUrls: ['./asset-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetPolicyComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';

  assetPolicy_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.policy_name', type: 1, field: 'Policy_Name' },
      { lable: 'tables.column.distance', type: 1, field: 'Distance' },
      { lable: 'tables.column.year', type: 1, field: 'Year' },
      {
        lable: 'tables.column.depreciation_value',
        type: 1,
        field: 'Depreciation_Value'
      }
    ],
    data: [
      {
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      }
    ]
  };

  subAssetPolicy_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.policy_name', type: 1, field: 'Policy_Name' },
      { lable: 'tables.column.distance', type: 1, field: 'Distance' },
      { lable: 'tables.column.year', type: 1, field: 'Year' },
      {
        lable: 'tables.column.depreciation_value',
        type: 1,
        field: 'Depreciation_Value'
      }
    ],
    data: [
      {
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      }
    ]
  };

  constructor(
    private assetPolicyFacade: AssetPolicyFacade,
    private subAssetPolicyFacade: SubAssetPolicyFacade
  ) {}

  ngOnInit(): void {
    this.assetPolicyFacade.loadAll();
    this.subAssetPolicyFacade.loadAll();
  }
}

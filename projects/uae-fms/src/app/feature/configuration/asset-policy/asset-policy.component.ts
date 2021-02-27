import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { TableSetting } from '@core/table';
import {
  AssetPolicyFacade,
  SubAssetPolicyFacade
} from '../+state/asset-policy';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-asset-policy',
  templateUrl: './asset-policy.component.html',
  styleUrls: ['./asset-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetPolicyComponent implements OnInit, OnDestroy {
  getAssetPolicySubscription!: Subscription;

  downloadBtn = 'assets/icons/download-solid.svg';

  assetPolicy_Table: TableSetting = {
    columns: [
      { lable: 'Policy Name', type: 1, field: 'Policy_Name' },
      { lable: 'Distance', type: 1, field: 'Distance' },
      { lable: 'Year', type: 1, field: 'Year' },
      { lable: 'Depreciation Value', type: 1, field: 'Depreciation_Value' }
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
      { lable: 'Policy Name', type: 1, field: 'Policy_Name' },
      { lable: 'Distance', type: 1, field: 'Distance' },
      { lable: 'Year', type: 1, field: 'Year' },
      { lable: 'Depreciation Value', type: 1, field: 'Depreciation_Value' }
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

    this.getAssetPolicySubscription = this.assetPolicyFacade.assetPolicy$.subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  ngOnDestroy(): void {
    this.getAssetPolicySubscription?.unsubscribe();
  }
}

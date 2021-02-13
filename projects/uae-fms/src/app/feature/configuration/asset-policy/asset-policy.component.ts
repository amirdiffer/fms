import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';
import { AssetPolicyFacade } from '../+state/asset-policy';

@Component({
  selector: 'anms-asset-policy',
  templateUrl: './asset-policy.component.html',
  styleUrls: ['./asset-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetPolicyComponent implements OnInit {
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

  constructor(private facade: AssetPolicyFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
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
      { lable: 'tables.column.policy_name', 
        type: 1, 
        field: 'Policy_Name' 
      },
      { 
        lable: 'tables.column.distance', 
        type: 1, 
        field: 'Distance' , 
        sortable: true
      },
      { 
        lable: 'tables.column.year', 
        type: 1, field: 'Year', 
        sortable: true
      },
      {
        lable: 'tables.column.depreciation_value',
        type: 1,
        field: 'Depreciation_Value',
        sortable: true
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: 1,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [
      {
        id:1,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id:2,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id:3,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id:4,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id:5,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id:6,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id:7,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      }
      
    ],
    rowSettings:{
      onClick: (col, data, button?) => {
        console.log(col, data, button);
      },
      floatButton: [
        {
          onClick: (col, data) => {
            console.log(col, data);
            this._router.navigate(['/configuration/asset-policy/edit-asset-policy/' + data.id]);
          },
          
          button: 'edit',
        }
      ]
    }
  };
  subAssetPolicy_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.policy_name', type: 1, field: 'Policy_Name' },
      { lable: 'tables.column.distance', type: 1, field: 'Distance' , sortable: true },
      { lable: 'tables.column.year', type: 1, field: 'Year' , sortable: true },
      {
        lable: 'tables.column.depreciation_value',
        type: 1,
        field: 'Depreciation_Value', sortable: true
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: 1,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [
      {
        id:1,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id:2,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id:3,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id:4,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id:5,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id:6,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id:7,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      }
      
    ],
    rowSettings:{
      onClick: (col, data, button?) => {
        console.log(col, data, button);
      },
      floatButton: [
        {
          onClick: (col, data) => {
            console.log(col, data);
            this._router.navigate(['/configuration/asset-policy/edit-asset-policy/' + data.id]);
          },
          
          button: 'edit',
        }
      ]
    }
  };
  selectedTab: any;


  constructor(
    private _router : Router,
    private assetPolicyFacade: AssetPolicyFacade,
    private subAssetPolicyFacade: SubAssetPolicyFacade,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.assetPolicyFacade.loadAll();
    this.subAssetPolicyFacade.loadAll();
  }

  addClicked(e: Event) {
    switch (this.selectedTab) {
      case 'assetPolicyAssetTab':
        this._router.navigate(['configuration/asset-policy/add']);
        break;
      case 'assetPolicySubAssetTab':
        this._router.navigate(['configuration/asset-policy/add'], {
          queryParams: { id: 'assetPolicySubAssetTab' }
        });
        break;
      default:
        this._router.navigate(['configuration/asset-policy']);
        break;
    }
  }
}

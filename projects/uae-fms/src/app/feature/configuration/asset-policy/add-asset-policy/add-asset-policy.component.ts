import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'anms-add-asset-policy',
  templateUrl: './add-asset-policy.component.html',
  styleUrls: ['./add-asset-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAssetPolicyComponent extends Utility implements OnInit {
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
  assetPolicyForm: FormGroup;
  submited = false;
  constructor(private _fb: FormBuilder, private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.assetPolicyForm = this._fb.group({
      policyType: ['asset', [Validators.required]],
      policyName: ['', [Validators.required]],
      killometerUsage: ['', [Validators.required]],
      yearUsage: [''],
      depreciationValue: ['', [Validators.required]],
      reminder: [false]
    });
  }

  submit() {
    this.submited = true;
    if (this.assetPolicyForm.invalid) {
      return;
    }
    this.goToList();
  }
}

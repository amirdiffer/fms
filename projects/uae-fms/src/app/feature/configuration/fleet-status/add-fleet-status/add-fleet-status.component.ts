import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'anms-add-fleet-status',
  templateUrl: './add-fleet-status.component.html',
  styleUrls: ['./add-fleet-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFleetStatusComponent extends Utility implements OnInit {
  tableSetting: TableSetting = {
    columns: [
      {
        lable: 'Status Category',
        field: 'Status_Category',
        type: 1
      },
      {
        lable: 'status',
        field: 'status',
        type: 1
      },
      {
        lable: 'tag',
        field: 'tag',
        type: 1
      },
      {
        lable: 'usage',
        field: 'usage',
        type: 1
      }
    ],
    data: [
      {
        statusColor: '#009EFF',
        Status_Category: 'Inactive',
        status: 'Storage, Registration, Workshop',
        tag: 'Wait Permission',
        usage: '23345'
      },
      {
        statusColor: '#FCB614',
        Status_Category: 'Active',
        status: 'Available, Reuse',
        tag: 'Assigned',
        usage: '23345'
      },
      {
        statusColor: '#FE5F4F',
        Status_Category: 'X Fleet',
        status: 'End Contract, Total Loss, Auction',
        tag: 'Sell',
        usage: '23345'
      }
    ]
  };
  fleetStatusForm: FormGroup;
  submited = false;
  languagePrefix = 'fms.configuration.fleetStatus.';

  statusCategories = [
    { name: 'Category 1', id: 1 },
    { name: 'Category 2', id: 2 },
    { name: 'Category 3', id: 3 },
    { name: 'Category 4', id: 4 },
    { name: 'Category 5', id: 5 }
  ];

  constructor(injector: Injector, private _fb: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    this.fleetStatusForm = this._fb.group({
      typeCategory: ['asset'],
      statusCategory: ['', [Validators.required]],
      statusName: ['', [Validators.required]]
    });
  }

  getLabelName(field) {
    return this.languagePrefix + field;
  }

  submit() {
    this.submited = true;
    if (this.fleetStatusForm.invalid) {
      return;
    }
    this.goToList();
  }
}
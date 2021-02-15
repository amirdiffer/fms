import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'anms-movement-confirm',
  templateUrl: './movement-confirm.component.html',
  styleUrls: ['./movement-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementConfirmComponent implements OnInit {
  confirmForm: FormGroup;
  assetSuggests = [
    { name: 'Old asset type 1', id: 1 },
    { name: 'Old asset type 2', id: 2 },
    { name: 'Old asset type 3', id: 3 },
    { name: 'Old asset type 4', id: 4 },
    { name: 'Old asset type 5', id: 5 },
    { name: 'Old asset type 6', id: 6 }
  ];

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.confirmForm = this._fb.group({
      asset: [''],
      department: [''],
      operator: [''],
      comment: [''],
      movementType: ['temporary'],
      startDate: [''],
      startTime: [''],
      endDate: [''],
      endTime: [''],
      gps: ['464646464'],
      sendNotification: [''],
      fuelCart: [true],
      serialNumber: ['']
    });
  }

  filterAssets(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.assetSuggests = [
      { name: 'Old asset type 1', id: 1 },
      { name: 'Old asset type 2', id: 2 },
      { name: 'Old asset type 3', id: 3 },
      { name: 'Old asset type 4', id: 4 },
      { name: 'Old asset type 5', id: 5 },
      { name: 'Old asset type 6', id: 6 }
    ];
  }
}

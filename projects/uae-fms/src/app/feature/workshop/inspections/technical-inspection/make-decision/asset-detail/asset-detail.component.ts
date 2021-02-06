import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'step2-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetDetailComponent implements OnInit {
  public inputForm: FormGroup;
  constructor(private _fb: FormBuilder) {}
  ngOnInit(): void {
    this.inputForm = this._fb.group({
      businessCategory: [''],
      receiver: [''],
      policyType: [''],
      serviceDate: [''],
      serviceOdometer: [''],
      setReminder: [false]
    });
  }
}

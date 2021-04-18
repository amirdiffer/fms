import { EventEmitter, Input } from '@angular/core';
import { Output } from '@angular/core';
import { Injector } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'step2-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})
export class AssetDetailComponent extends Utility implements OnInit {
  @Output('formGroup') formGroup: EventEmitter<FormGroup> = new EventEmitter();
  @Input('submit') submit = false;
  public inputForm: FormGroup;
  constructor(private _fb: FormBuilder, injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    this.inputForm = this._fb.group({
      businessCategory: ['', Validators.compose([Validators.required])],
      receiver: ['', Validators.compose([Validators.required])],
      policyType: ['', Validators.compose([Validators.required])],
      serviceDate: ['', Validators.compose([Validators.required])],
      serviceOdometer: ['', Validators.compose([Validators.required])],
      setReminder: [false, Validators.compose([Validators.required])]
    });
    this.inputForm.valueChanges.subscribe((form) => {
      this.formGroup.emit(form);
    });
  }
}

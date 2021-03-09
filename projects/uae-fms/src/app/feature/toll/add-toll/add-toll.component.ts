import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TollFacade } from '@feature/toll/+state';

@Component({
  selector: 'anms-add-toll',
  templateUrl: './add-toll.component.html',
  styleUrls: ['./add-toll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTollComponent implements OnInit {
  constructor(
      private _fb: FormBuilder,
      private facade: TollFacade
    ) {
    this._migrateForm();
  }

  form: FormGroup;

  private _migrateForm(): void {
    this.form = this._fb.group({
      file: ["", Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {}

  fileValid = null;
  checkType(event: Event) {
    let filename = event.target['files'][0].name
    let parts = filename.split('.');
    let ext = parts[parts.length - 1];
    switch (ext.toLowerCase()) {
      case 'csv': {
        this.fileValid = true;
        return true;
      }
    }
    this.fileValid = false;
    return false;
  }

  hasError(controlName) {
    const control: FormControl = this.form.get(controlName) as FormControl;

    if (control.dirty && control.invalid) {
      return true;
    }

    return false;
  }

  formSubmitted = false;
  addToll(): void {
    this.formSubmitted = true;
    if (this.form.invalid) return;
    this.facade.addToll(this.form.getRawValue());
  }

}

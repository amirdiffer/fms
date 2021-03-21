import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';

@Component({
  selector: 'anms-part-list-form',
  templateUrl: './part-list-form.component.html',
  styleUrls: ['./part-list-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartListFormComponent implements OnInit {
  searchIcon = 'assets/icons/search.svg';

  locations = [
    { name: 'Room', code: 'room' },
    { name: 'Saloon', code: 'saloon' }
  ];

  languagePrefix = 'fms.parts.';

  folders = [
    { name: 'Folder 1', code: '1' },
    { name: 'Folder 2', code: '2' },
    { name: 'Folder 3', code: '3' }
  ];

  categories = [
    { name: 'Category 1', code: '1' },
    { name: 'Category 2', code: '2' },
    { name: 'Category 3', code: '3' }
  ];

  items = [
    { name: 'Item 1', code: '1' },
    { name: 'Item 2', code: '2' },
    { name: 'Item 3', code: '3' }
  ];

  recordId: number;

  partForm: FormGroup;

  filterSetting = [];
  partMasterTableSetting;

  formSubmitted = false;
  formChanged = false;
  dialogModalAdd = false;
  dialogModalError = false;
  dialogModalCancel = false;

  dialogSettingAdd: IDialogAlert = {
    header: 'Part',
    hasError: false,
    hasHeader: true,
    message: 'New Part Successfully Added',
    confirmButton: 'OK'
  };
  dialogSettingCancel: IDialogAlert = {
    header: 'Part',
    hasError: false,
    isWarning: true,
    hasHeader: true,
    message: 'Are you sure that you want to cancel the Part creation?',
    confirmButton: 'Yes',
    cancelButton: 'No'
  };

  dialogSettingError: IDialogAlert = {
    header: 'Part',
    hasError: true,
    isWarning: false,
    hasHeader: true,
    message: 'Please fill in all the required fields.',
    confirmButton: 'OK'
  };
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.partForm = this._fb.group({
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      warrantyExpiryDate: [''],
      description: [''],
      folder: ['', Validators.required],
      category: ['', Validators.required],
      item: ['', Validators.required],
      room: [''],
      aisle: [''],
      shelf: [''],
      box: ['']
    });
  }

  getLabelName(field) {
    return this.languagePrefix + field;
  }

  ngOnInit(): void {
    this.partForm.valueChanges.subscribe(() => {
      this.formChanged = true;
    });

    this._route.queryParamMap.subscribe((params) => {
      this.recordId = +params.get('id');
    });
  }

  hasError(controlName) {
    const control: FormControl = this.partForm.get(controlName) as FormControl;

    if (control.dirty && control.invalid) {
      return true;
    }

    return false;
  }

  submit() {
    this.formSubmitted = true;
    if (this.partForm.invalid) {
      this.partForm.markAllAsTouched();
      this.dialogModalError = true;
      return;
    } else {
      this.dialogModalAdd = true;
    }
  }

  cancel() {
    if (this.formChanged) {
      this.dialogModalCancel = true;
      return;
    }

    this._router.navigate(['part-store/part-list']);
  }

  dialogCancelConfirm(value) {
    if (value === true) {
      this._router.navigate(['part-store/part-list']);
    }
    this.dialogModalCancel = false;
  }
  dialogAddConfirm(value) {
    if (value === true) {
      this._router.navigate(['part-store/part-list']);
    }
    this.dialogModalAdd = false;
  }

  dialogErrorConfirm(value) {
    this.dialogModalError = false;
  }
}

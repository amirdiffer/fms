import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

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

  partForm: FormGroup;

  filterSetting = [];
  partMasterTableSetting;
  constructor(private _fb: FormBuilder) {
    this.partForm = this._fb.group({
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      warrantyExpiryDate: [''],
      description: [''],
      room: [''],
      aisle: [''],
      shelf: [''],
      box: ['']
    });
  }

  ngOnInit(): void {}

  hasError(controlName) {
    const control: FormControl = this.partForm.get(controlName) as FormControl;

    if (control.dirty && control.invalid) {
      return true;
    }

    return false;
  }
}

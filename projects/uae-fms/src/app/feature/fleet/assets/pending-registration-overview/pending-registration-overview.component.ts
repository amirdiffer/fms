import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { Utility } from '@shared/utility/utility';
import { AssetRegistrationConfirmComponent } from '../asset-registration-confirm/asset-registration-confirm.component';

@Component({
  selector: 'anms-pending-registration-overview',
  templateUrl: './pending-registration-overview.component.html',
  styleUrls: ['./pending-registration-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendingRegistrationOverviewComponent
  extends Utility
  implements OnInit {
  salikTags: any[] = [
    { name: 'Item No 234567890', gps: '456783234658' },
    { name: 'Item No 234567891', gps: '666663345435' },
    { name: 'Item No 234567892', gps: '567434234244' },
    { name: 'Item No 234567893', gps: '541565456465' },
    { name: 'Item No 234567894', gps: '489456141856' }
  ];
  filteredSalikTag: any[];
  fuelTags: any[] = [
    { name: 'Item No 234567890', gps: '456783234658' },
    { name: 'Item No 234567891', gps: '666663345435' },
    { name: 'Item No 234567892', gps: '567434234244' },
    { name: 'Item No 234567893', gps: '541565456465' },
    { name: 'Item No 234567894', gps: '489456141856' }
  ];
  filteredFuelTag: any[];
  inputForm: FormGroup;
  submitted = false;
  displayModal = false;
  dialogSetting : IDialogAlert ={
    header:'Asset Successfully Registered',
    hasError:false,
    message:'Sample hint is here to explain process',
    confirmButton: 'Customize Now',
    buttons:[
      {
        title:'Customize Later',
        eventEmit:'customizeLater'
      }
    ],
    cancelButton:'Cancel',
  }

  constructor(
    private dialog: MatDialog,
    private _fb: FormBuilder,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      plateNumber: ['', [Validators.required]],
      insuranceNumber: ['', [Validators.required]],
      salikTag: ['', [Validators.required]],
      fuelTag: ['', [Validators.required]],
      operator: [''],
      department: [''],
      employeeNumber: [''],
      currentLiveReading: ['']
    });
  }
  searchSalikTag(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.salikTags.length; i++) {
      let salikTag = this.salikTags[i];
      if (salikTag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(salikTag);
      }
    }
    this.filteredSalikTag = filtered;
  }
  searchFuelTag(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.fuelTags.length; i++) {
      let fuelTag = this.fuelTags[i];
      if (fuelTag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(fuelTag);
      }
    }
    this.filteredFuelTag = filtered;
  }

  dialogConfirm (event){
    this.displayModal = false;
    console.log(event)
  }

  submit() {
    this.submitted = true;
    if (this.inputForm.invalid) {
      return;
    } else {
      this.displayModal = true;
    }
  }

  public get language(): string {
    return localStorage.getItem('lang');
  }
}

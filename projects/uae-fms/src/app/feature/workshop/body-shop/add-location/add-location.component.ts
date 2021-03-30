import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { TableSetting } from '@core/table';
import { ButtonType } from '@core/table/table.component';
import { Utility } from '@shared/utility/utility';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';

@Component({
  selector: 'anms-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddLocationComponent extends Utility implements OnInit {
  dialogModal = false;

  dialogSetting: IDialogAlert = {
    header: 'Add Location',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };

  inputForm: FormGroup;
  submited = false;
  filteredLocation;
  locationID: any[] = [
    {
      id: '1',
      name: 'Location ID 1'
    },
    {
      id: '2',
      name: 'Location ID 2'
    },
    {
      id: '3',
      name: 'Location ID 3'
    },
    {
      id: '4',
      name: 'Location ID 4'
    },
    {
      id: '5',
      name: 'Location ID 5'
    },
    {
      id: '6',
      name: 'Location ID 6'
    }
  ];
  addLocation_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.location_id', type: 1, field: 'Location_ID' },
      { lable: 'tables.column.services', type: 1, field: 'Services' },
      { lable: 'tables.column.location', type: 1, field: 'Location' },
      { lable: 'tables.column.section', type: 1, field: 'Section' },
      {
        lable: 'tables.column.job_card',
        type: 1,
        field: 'Job_Card',
        sortable: true
      },
      {
        lable: 'tables.column.technician',
        type: 1,
        field: 'Technician',
        sortable: true
      },
      {
        lable: 'tables.column.assets',
        type: 1,
        field: 'Assets',
        sortable: true
      },
      {
        lable:
          '<img src="../../../../../assets/icons/ellipsis-v.svg" class="icon24px">',
        type: 3,
        width: 70,
        isIconLable: true,
        field: 'addButton',
        renderer: 'button',
        buttonType: ButtonType.add
      }
    ],
    data: [
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      }
    ]
  };

  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private _roter: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      locationID: [''],
      address: ['', [Validators.required]],
      section: this._fb.array([this.createSection()])
    });
  }
  searchLocation(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.locationID.length; i++) {
      let location = this.locationID[i];
      if (location.id.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(location);
      }
    }
    this.filteredLocation = filtered;
  }
  autocompleteValidationLocationID(input: FormControl) {
    const inputValid = input.value.id;
    if (inputValid) {
      return null;
    } else {
      return { needsExclamation: true };
    }
  }

  createSection(): FormGroup {
    return this._fb.group({
      section: ['', [Validators.required]],
      services: this._fb.array([this.createService()])
    });
  }

  createService(): FormGroup {
    return this._fb.group({
      service: ['', [Validators.required]]
    });
  }

  addSection() {
    const section = <FormArray>this.inputForm.get('section');

    if (section.invalid) {
      return;
    }

    section.push(this.createSection());
  }

  addService(index: number) {
    const services = (<FormArray>this.inputForm.get('section')).controls[
      index
    ].get('services') as FormArray;

    if (services.invalid) {
      return;
    }

    services.push(this.createService());
  }

  dialogConfirm(event) {
    this.dialogModal = false;
    if (event && !this.dialogSetting.hasError) {
      this.goToList();
    }
  }

  addRequest() {
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    }

    console.log(this.inputForm.value);
    this.dialogModal = true;
    this.dialogSetting.isWarning = false;
    this.dialogSetting.message = 'New location added successfully';
    this.dialogSetting.confirmButton = 'Ok';
    this.dialogSetting.cancelButton = undefined;
  }

  cancelForm() {
    this.dialogModal = true;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.cancelButton = 'No';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.message = 'Are you sure cancelling add new location?';
    // if (this.inputForm.dirty) {
    //   confirm('Are You sure that you want to cancel?')
    //     ? this._roter.navigate(['/workshop/body-shop'] , {queryParams:{id:'locationTab'}})
    //     : null;
    // } else {
    //   this._roter.navigate(['/workshop/body-shop'] , {queryParams:{id:'locationTab'}});
    // }
  }

  get section(): FormArray {
    return this.inputForm.get('section') as FormArray;
  }
}

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
import { ColumnType, TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
@Component({
  selector: 'anms-add-technician',
  templateUrl: './add-technician.component.html',
  styleUrls: ['./add-technician.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTechnicianComponent extends Utility implements OnInit {
  dialogModal = false;

  dialogSetting: IDialogAlert = {
    header: 'Add Technician',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };

  inputForm: FormGroup;
  filteredEmployeNumb;
  filteredLocation;
  submited = false;
  progressBarValue = 50;
  bufferValue = 70;
  public filesUpdloaded: NgxFileDropEntry[] = [];
  employes: any[] = [
    {
      id: '1',
      fName: 'Hamid',
      lName: 'Mottaghian',
      email: 'admin@jointscopes.com',
      number: '+989351730011',
      employeNumber: '1234568'
    },
    {
      id: '2',
      fName: 'Alireza',
      lName: 'Hamidi',
      email: 'admin@jointscopes.com',
      number: '+989351730011',
      employeNumber: '1234568'
    },
    {
      id: '3',
      fName: 'Amir Hossein',
      lName: 'Hosseini',
      email: 'admin@jointscopes.com',
      number: '+989351730011',
      employeNumber: '1234568'
    },
    {
      id: '4',
      fName: 'Mahdi',
      lName: 'MaddahPour',
      email: 'admin@jointscopes.com',
      number: '+989351730011',
      employeNumber: '1234568'
    }
  ];
  locations: any[] = [
    {
      name: 'Hamid',
      city: 'Dubai',
      address: 'street 1'
    },
    {
      name: 'Nirvana',
      city: 'Dubai',
      address: 'street 2'
    },
    {
      name: 'Mellisa',
      city: 'Dubai',
      address: 'street 3'
    },
    {
      name: 'Farid',
      city: 'Dubai',
      address: 'street 4'
    },
    {
      name: 'Eden',
      city: 'Dubai',
      address: 'street 5'
    }
  ];

  addTechnician_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.technician',
        field: 'technician',
        renderer: 'userRenderer',
        thumbField: 'picture'
      },
      {
        lable: 'tables.column.skill',
        field: 'skill',
        type: ColumnType.lable,
        width: 400
      },
      {
        lable: 'tables.column.status',
        field: 'status',
        type: ColumnType.lable,
        textColor: '#6870B4'
      },
      {
        lable: 'tables.column.tasks',
        field: 'tasks',
        type: ColumnType.lable
      },
      {
        lable: 'tables.column.information',
        field: 'information',
        type: ColumnType.lable,
        renderer: 'informationRenderer'
      },
      {
        lable: 'tables.column.rate_per_hour',
        field: 'ratePerHour',
        type: ColumnType.lable
      }
    ],
    data: [
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      }
    ]
  };
  currentTab: string;

  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private _roter: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      portalInfo: this._fb.group({
        emplyeeNumber: [
          '',
          [Validators.required, this.autocompleteValidationEmployeNumber]
        ],
        payPerHours: ['', [Validators.required]],
        active: [false]
      }),
      professional: this._fb.group({
        skills: this._fb.array([this._fb.control('', [Validators.required])]),
        location: this._fb.array([this._fb.control('', [Validators.required])])
      }),
      file: [''],
      pesonalInfo: this._fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: this._fb.array([this._fb.control('', [Validators.required])]),
        phoneNumber: this._fb.array([
          this._fb.control('', [Validators.required])
        ]),
        notification: this._fb.group({
          call: [true],
          sms: [true],
          email: [true],
          whatsapp: [false]
        })
      })
    });
  }

  searchEmploye(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.employes.length; i++) {
      let employe = this.employes[i];
      if (employe.fName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(employe);
      }
    }
    this.filteredEmployeNumb = filtered;
  }

  selectedEmploye(value) {
    this.inputForm.patchValue({
      pesonalInfo: {
        firstName: value.fName,
        lastName: value.lName,
        email: [value.email],
        phoneNumber: [value.number]
      }
    });
    this.inputForm.get('pesonalInfo.firstName').markAsDirty();
    this.inputForm.get('pesonalInfo.lastName').markAsDirty();
    this.inputForm.get('pesonalInfo.email')['controls'][0].markAsDirty();
    this.inputForm.get('pesonalInfo.phoneNumber')['controls'][0].markAsDirty();
  }
  searchLocation(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.locations.length; i++) {
      let location = this.locations[i];
      if (location.city.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(location);
      }
    }
    this.filteredLocation = filtered;
  }

  /* AutoComplete Validation  */
  autocompleteValidationEmployeNumber(input: FormControl) {
    const inputValid = input.value.employeNumber;
    if (inputValid) {
      return null;
    } else {
      return { needsExclamation: true };
    }
  }
  autocompleteValidationLocation(input: FormControl) {
    const inputValid = input.value.city;
    if (inputValid) {
      return null;
    } else {
      return { needsExclamation: true };
    }
  }

  /* Add Forrm Array */
  addSkill() {
    if (this.inputForm.get('professional.skills').invalid) {
      return;
    }
    const skill = new FormControl(null, [Validators.required]);
    (<FormArray>this.inputForm.get('professional.skills')).push(skill);
  }
  addLocation() {
    if (this.inputForm.get('professional.location').invalid) {
      return;
    }
    const location = new FormControl(null, [Validators.required]);
    (<FormArray>this.inputForm.get('professional.location')).push(location);
  }
  addEmail() {
    const email = new FormControl(null, [Validators.required]);
    (<FormArray>this.inputForm.get('pesonalInfo.email')).push(email);
  }
  addPhoneNumber() {
    const phoneNumber = new FormControl(null, [Validators.required]);
    (<FormArray>this.inputForm.get('pesonalInfo.phoneNumber')).push(
      phoneNumber
    );
  }

  dialogConfirm($event): void {
    this.dialogModal = false;
    if ($event && !this.dialogSetting.hasError) {
      this.goToList();
    }
  }

  addRequest() {
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    }

    this.dialogModal = true;
    this.dialogSetting.isWarning = false;
    this.dialogSetting.hasError = false;
    this.dialogSetting.message = 'Technician added successfully';
    this.dialogSetting.confirmButton = 'OK';
    this.dialogSetting.cancelButton = undefined;
  }

  cancelForm() {
    this.dialogModal = true;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message =
      'Are you sure to cancel adding new technician?';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'No';

    // if (this.inputForm.dirty) {
    //   confirm('Are You sure that you want to cancel?')
    //     ? this._roter.navigate(['/workshop/body-shop'], {
    //         queryParams: { id: 'technicianTab' }
    //       })
    //     : null;
    // } else {
    //   this._roter.navigate(['/workshop/body-shop'], {
    //     queryParams: { id: 'technicianTab' }
    //   });
    // }
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.filesUpdloaded = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }
}

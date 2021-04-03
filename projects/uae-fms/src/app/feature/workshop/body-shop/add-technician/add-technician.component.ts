import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector,
  ChangeDetectorRef
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
import { debounceTime, map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import {
  BodyShopLocationFacade, BodyShopLocationService,
  BodyShopTechnicianFacade,
  BodyShopTechnicianService
} from '@feature/workshop/+state/body-shop';
import { UsersService } from '@feature/configuration/+state/users';
import { TaskMasterFacade, TaskMasterService } from '@feature/workshop/+state/task-master';
@Component({
  selector: 'anms-add-technician',
  templateUrl: './add-technician.component.html',
  styleUrls: ['./add-technician.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTechnicianComponent extends Utility implements OnInit {
  isEdit: boolean = false;
  //#region Dialog
  dialogSetting: IDialogAlert = {
    header: 'Add Technician',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };
  errorDialogSetting: IDialogAlert = {
    header: '',
    message: 'Error occurred in progress',
    confirmButton: 'Ok',
    isWarning: false,
    hasError: true,
    hasHeader: true,
    cancelButton: undefined
  };
  dialogModal = false;
  dialogType = null;
  errorDialogModal = false;
  //#endregion Dialog
  inputForm: FormGroup;
  filteredEmployeNumb;
  filteredLocation;
  submited = false;
  progressBarValue = 50;
  bufferValue = 70;
  public filesUpdloaded: NgxFileDropEntry[] = [];
  employees = new Subject();
  employees$ = this.employees.asObservable();
  getEmployeesList = new Subject();
  employeeId;
  employee_static;

  addTechnician_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.technician',
        field: 'technician',
        renderer: 'technicianRenderer',
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
        picture: 'technician-image.png',
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
        picture: 'technician-image.png',
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
        picture: 'technician-image.png',
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
        picture: 'technician-image.png',
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
        picture: 'technician-image.png',
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
  private _technician: any;
  id: any;
  formChangesSubscription!: Subscription;
  locations: any[];
  locationsB;
  skills: any[];
  skillsB;
  profileDocId: number;
  get emails(): FormArray {
    return this.inputForm.get('personalInfo').get('email') as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.inputForm.get('personalInfo').get('phoneNumber') as FormArray;
  }

  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private _roter: Router,
    private userService: UsersService,
    private _technicianFacade: BodyShopTechnicianFacade,
    private _technicalService: BodyShopTechnicianService,
    private _locationFacade: BodyShopLocationFacade,
    private _locationService: BodyShopLocationService,
    private _taskMasterService: TaskMasterService,
    private changeDetector: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._locationFacade.loadAll();
    this._taskMasterService.skills().subscribe((x) => {
      let data = x.message;
      this.skillsB = data.map(y => ({ id: y.id, name: y.name }));
    });
    this._locationService.loadAll().subscribe(x => {
      let data = x.message;
      console.log(data)
      this.locationsB = data.map(y => ({ id: y.id, name: y.address }));
    });
    this.buildForm();
    this.route.url.subscribe((params) => {
      this.isEdit =
        params.filter((x) => x.path == 'edit-technician').length > 0
          ? true
          : false;

      if (this.isEdit) {
        this.id = +params[params.length - 1].path;
        this._technicalService
          .getTechnicianById(params[params.length - 1].path)
          .pipe(map((x) => x.message))
          .subscribe((x) => {
            if (x) {
              this._technician = x;
              this.inputForm.controls['portalInfo'].patchValue({
                employeeNumber: {
                  name: x.user.id,
                  id: x.user.employeeNumber
                },
                active: x.user.isActive,
                payPerHours: x.payPerHour
              });
              this.inputForm.controls['portalInfo']
                .get('payPerHours')
                .markAsDirty();

              this.inputForm.controls['personalInfo'].patchValue({
                firstName: x.user.firstName,
                lastName: x.user.lastName,
                callCheckbox: false,
                smsCheckbox: false,
                whatsappCheckbox: false,
                emailCheckbox: false,
                email: x.user.emails,
                phoneNumber: x.user.phoneNumbers
              });
              this.inputForm.controls['personalInfo']
                .get('firstName')
                .markAsDirty();
              this.inputForm.controls['personalInfo']
                .get('lastName')
                .markAsDirty();
              this.emails.controls[0].markAsDirty();
              // this.inputForm.controls['fileUpload'].patchValue({
              //   fileName: x.user.profileDocId
              // });
            }
          });
      } else {
        this.formChangesSubscription = this.inputForm.valueChanges.subscribe(
          (formValues) => {
            if (formValues.portalInfo.employeeNumber.name) {
              this.inputForm.controls['personalInfo'].patchValue(
                {
                  firstName: formValues.portalInfo.employeeNumber.name,
                  lastName: formValues.portalInfo.employeeNumber.name
                },
                { emitEvent: false }
              );
            }
          }
        );
      }
    });

    this._technicianFacade.submitted$.subscribe((x) => {
      console.log('Submit : ', x);
      if (x) {
        this.dialogModal = true;
        this.dialogType = 'success';
        this.dialogSetting.header = this.isEdit ? 'Edit user' : 'Add new user';
        this.dialogSetting.message = this.isEdit
          ? 'Changes Saved Successfully'
          : 'User Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'Yes';
        this.dialogSetting.cancelButton = undefined;
        this.changeDetector.detectChanges();
      }
    });

    this._technicianFacade.error$.subscribe((x) => {
      if (x?.error) {
        console.log(x?.error);
        this.errorDialogModal = true;
        this.errorDialogSetting.header = this.isEdit
          ? 'Edit user'
          : 'Add new user';
        this.errorDialogSetting.hasError = true;
        this.errorDialogSetting.cancelButton = undefined;
        this.errorDialogSetting.confirmButton = 'Ok';
        this.changeDetector.detectChanges();
      } else {
        this.errorDialogModal = false;
      }
    });
    this.getEmployeesList.pipe(debounceTime(600)).subscribe((x) => {
      this.userService.searchEmployee(x['query']).subscribe((y) => {
        if (y) {
          this.employees.next([y.message]);
        } else {
          this.employees.next(null);
        }
      });
    });
  }

  private buildForm() {
    this.inputForm = this._fb.group({
      organizationId: [null, [Validators.required]],
      departmentId: [null, [Validators.required]],
      portalInfo: this._fb.group({
        employeeNumber: ['', [Validators.required]],
        payPerHours: ['', [Validators.required]],
        active: [false]
      }),
      professional: this._fb.group({
        skills: this._fb.array([this._fb.control('', [Validators.required])]),
        location: this._fb.array([this._fb.control('', [Validators.required])])
      }),
      file: [''],
      personalInfo: this._fb.group({
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
  //
  // searchEmploye(event) {
  //   this.getEmployeesList.next(event);
  //   this.employeeId = event.query;
  // }
  //
  // selectedEmploye(value) {
  //   this.inputForm.patchValue({
  //     personalInfo: {
  //       // firstName: value.fName,
  //       // lastName: value.lName,
  //       email: [value.emailAddress],
  //       phoneNumber: [value.mobileNumber]
  //     }
  //   });
  //   // this.inputForm.get('personalInfo.firstName').markAsDirty();
  //   // this.inputForm.get('personalInfo.lastName').markAsDirty();
  //   this.inputForm.get('personalInfo.email')['controls'][0].markAsDirty();
  //   this.inputForm.get('personalInfo.phoneNumber')['controls'][0].markAsDirty();
  // }

  filterSkills(event) {
    this.skills = this.skillsB.filter(x => (x.id + "").indexOf(event.query) >= 0 || x.name.indexOf(event.query) >= 0);
  }

  filterLocation(event) {
    this.locations = this.locationsB.filter(x => (x.id + "").indexOf(event.query) >= 0 || x.name.indexOf(event.query) >= 0);
    console.log(this.locations)
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
    (<FormArray>this.inputForm.get('personalInfo.email')).push(email);
  }
  addPhoneNumber() {
    const phoneNumber = new FormControl(null, [Validators.required]);
    (<FormArray>this.inputForm.get('personalInfo.phoneNumber')).push(
      phoneNumber
    );
  }

  dialogConfirm($event): void {
    this.errorDialogModal = false;
    this.dialogModal = false;
    if (!$event) return;

    if (this.dialogType == 'submit') {
      let f = this.inputForm.value;
      console.log(this._technician);
      let technicianInfo: any = {
        employeeNumber: this.isEdit
          ? this._technician?.employeeNumber
          : this.employeeId,
        organizationId: 1,
        departmentId: 1,
        payPerHour: f.portalInfo.payPerHours,
        isActive: f.portalInfo.active,
        profileDocId: this.profileDocId || 1,
        skillIds: [3],
        locationIds: f.professional.location.map((l) => l.id),
        firstName: f.personalInfo.firstName,
        lastName: f.personalInfo.lastName,
        emails: f.personalInfo.email.map((x) => {
          if (x) {
            if (typeof x == 'string') return x;
            else return x[0];
          } else if (typeof x == 'object') return x[0];
        }),
        phoneNumbers: this.getPhone(f),
        notifyByCall: f.personalInfo.notification.call,
        notifyBySMS: f.personalInfo.notification.sms,
        notifyByWhatsApp: f.personalInfo.notification.whatsapp,
        notifyByEmail: f.personalInfo.notification.email
      };

      if (this.isEdit) {
        technicianInfo = {
          ...technicianInfo,
          id: this.id
        };

        console.log(technicianInfo);
        this._technicianFacade.editTechnician(technicianInfo);
      } else {
        technicianInfo = {
          ...technicianInfo
        };
        this._technicianFacade.addTechnician(technicianInfo);
      }
    } else {
      this.router.navigate(['workshop/body-shop']).then((_) => {
        this._technicianFacade.resetParams();
      });
    }
  }

  getPhone(f) {
    if (f.personalInfo.phoneNumber && f.personalInfo.phoneNumber.length > 0) {
      if (typeof f.personalInfo.phoneNumber[0] == 'object') {
        console.log(f.personalInfo.phoneNumber[0].phoneNumber.length);
        if (
          typeof f.personalInfo.phoneNumber[0] == 'object' &&
          typeof f.personalInfo.phoneNumber[0].phoneNumber == 'string' &&
          f.personalInfo.phoneNumber[0].phoneNumber.length < 5
        )
          return [];
      } else if (typeof f.personalInfo.phoneNumber[0] == 'string') {
        if (f.personalInfo.phoneNumber[0].length < 5) return [];
      }
      return f.personalInfo.phoneNumber.map((x) => {
        if (!x) return;
        if (x) {
          if (typeof x == 'string') return x;
          else return x[0];
        } else if (typeof x == 'object') {
          if (x) return x;
          else if (x[0]) return x[0];
          else return '';
        }
      });
    }
  }

  getEmployee(event) {
    this.getEmployeesList.next(event);
    this.employeeId = event.query;
  }

  employeeNumberChanged($event) {
    this.employee_static = $event;
    if (typeof $event != 'object') return;
    this.inputForm.get('organizationId').patchValue($event.organizationId);
    this.inputForm.get('departmentId').patchValue($event.organizationId);
    this.inputForm.get('personalInfo').patchValue({
      phoneNumber: [$event.mobileNumber],
      email: [$event.emailAddress],
      firstName: $event.name,
      lastName: ''
    });
      this.inputForm.get('personalInfo.firstName').markAsDirty();
      this.inputForm.get('personalInfo.lastName').markAsDirty();
      this.inputForm.get('personalInfo.email')['controls'][0].markAsDirty();
      this.inputForm.get('personalInfo.phoneNumber')['controls'][0].markAsDirty();
    console.log(this.inputForm.value);
  }

  addRequest() {
    console.log(this.inputForm.value);
    this.submited = true;
    // if (this.inputForm.invalid) {
    //   return;
    // }

    this.dialogModal = true;
    this.dialogType = 'submit';
    if (this.isEdit) {
      this.dialogSetting.header = 'Edit technician';
      this.dialogSetting.message =
        'Are you sure you want to submit this changes?';
      this.dialogSetting.isWarning = true;
      this.dialogSetting.confirmButton = 'Yes';
      this.dialogSetting.cancelButton = 'Cancel';
      return;
    } else {
      this.dialogSetting.header = 'Add new technician';
      this.dialogSetting.isWarning = true;
      this.dialogSetting.hasError = false;
      this.dialogSetting.message =
        'Are you sure you want to add new technician?';
      this.dialogSetting.confirmButton = 'OK';
      this.dialogSetting.cancelButton = 'Cancel';
    }
    let d = this.inputForm.getRawValue();
    let skills = (<object[]>d.professional.skills).map(x => x = x['id'])
    let location = (<object[]>d.professional.location).map(x => x = x['id'])
    console.log(d)
    let _data = {
      "employeeNumber": this.employeeId,
      "organizationId": 1,
      "departmentId": 1,
      "payPerHour": d.portalInfo.payPerHours,
      "isActive": d.portalInfo.active,
      "skillIds": skills,
      "locationIds": location,
      "profileDocId": this.profileDocId,
      "firstName": d.personalInfo.firstName,
      "lastName": d.personalInfo.lastName,
      "emails": d.personalInfo.email,
      "phoneNumbers": d.personalInfo.phoneNumber,
      "notifyByCall": d.personalInfo.notification.call,
      "notifyBySMS": d.personalInfo.notification.sms,
      "notifyByEmail": d.personalInfo.notification.email,
      "notifyByWhatsapp": d.personalInfo.notification.whatsapp,
    };
    this._technicianFacade.addTechnician(_data)
  }

  cancelForm() {
    this.dialogModal = true;
    this.dialogType = 'cancel';
    if (this.isEdit) {
      this.dialogSetting.header = 'Edit technician';
      this.dialogSetting.hasError = false;
      this.dialogSetting.isWarning = true;
      this.dialogSetting.message =
        'Are you sure that you want to cancel editing technician?';
      this.dialogSetting.confirmButton = 'Yes';
      this.dialogSetting.cancelButton = 'Cancel';
      return;
    }

    this.dialogSetting.header = 'Add new technician';
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message =
      'Are you sure that you want to cancel adding new technician?';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'Cancel';
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.filesUpdloaded = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  uploadImage($event) {
    console.log($event)
    if (!$event || !$event.files) {
      return;
    }
    const docId = $event.files[0];
    this.profileDocId = docId;
  }
}

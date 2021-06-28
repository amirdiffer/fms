import { Component, OnInit, Injector } from '@angular/core';
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
import { debounceTime, map, tap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { UsersService } from '@feature/configuration/+state/users';
import {
  TaskMasterFacade,
  TaskMasterService
} from '@feature/workshop/+state/task-master';
import { OrganizationService } from '@feature/fleet/+state/organization';
import {
  BodyShopTechnicianFacade,
  BodyShopTechnicianService
} from '@feature/workshop/+state/body-shop/technician';
import {
  BodyShopLocationFacade,
  BodyShopLocationService
} from '@feature/workshop/+state/body-shop/location';
import { DialogService } from '@core/dialog/dialog-template.component';
@Component({
  selector: 'anms-add-technician',
  templateUrl: './add-technician.component.html',
  styleUrls: ['./add-technician.component.scss']
})
export class AddTechnicianComponent extends Utility implements OnInit {
  isEdit: boolean = false;
  inputForm: FormGroup;
  filteredEmployeNumb;
  filteredLocation;
  submited = false;
  progressBarValue = 50;
  bufferValue = 70;
  employees = new Subject();
  employees$ = this.employees.asObservable();
  getEmployeesList = new Subject();
  employeeId;
  employee_static;
  departmentList: any[];
  departmentFiltered: any[];
  departmentSerive$: Subscription;
  sectionFiltered: any[];
  sectionList: any[]=[];
  depatmentSectionSevice$: Subscription;
  department_static;
  departmentId;
  avatarId = [];
  section_static;
  sectionId;
  skillList: any[] = [];
  skillFiltered: any[] = [];
  skills$: Subscription;
  technicianData$ = this._technicianFacade.bodyShop$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          technician: {
            firstName: y.user.firstName,
            lastName: y.user.lastName,
            id: y.user.id
            // picture: 'assets/user-image.png',
          },
          skill: y.skills.map((s) => s.name).join(','),
          status: 'Available',
          tasks: y.numOfTasks,
          information: {
            email: y.user.emails[0],
            phoneNumber: y.user.phoneNumbers[0]
          },
          ratePerHour: y.payPerHour
        };
      });
    })
  );

  addTechnician_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.technician',
        field: 'technician',
        width: 180,
        renderer: 'userRenderer'
      },
      {
        lable: 'tables.column.skill',
        field: 'skill',
        width: 180,
        type: ColumnType.lable
      },
      {
        lable: 'tables.column.status',
        field: 'status',
        type: ColumnType.lable,
        width: 120,
        textColor: '#6870B4'
      },
      {
        lable: 'tables.column.task',
        field: 'tasks',
        type: ColumnType.lable,
        width: 80
      },
      {
        lable: 'tables.column.information',
        field: 'information',
        type: ColumnType.lable,
        width: 120,
        renderer: 'informationRenderer'
      },
      {
        lable: 'tables.column.rate_per_hour',
        field: 'ratePerHour',
        type: ColumnType.lable,
        width: 100,
        sortable: true
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton',
        hasJobCardButton: false
      }
    ],
    data: [],
    rowSettings: {
      onClick: (col, data, button?) => {},
      floatButton: [
        {
          button: 'edit',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            this._technicianFacade.resetParams();
            this.router.navigate([
              '/workshop/body-shop/edit-technician/' + data.id
            ]);
          }
        }
      ]
    }
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
  location$: Subscription;
  locationList: any[] = [];
  locationFiltered: any[] = [];
  get emails(): FormArray {
    return this.inputForm.get('personalInfo').get('email') as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.inputForm.get('personalInfo').get('phoneNumber') as FormArray;
  }

  get getSkill(): FormArray {
    return this.inputForm.get('professional').get('skills') as FormArray;
  }

  get getLocation(): FormArray {
    return this.inputForm.get('professional').get('location') as FormArray;
  }

  /* Autocomplete formControl */
  get employeeNumber() {
    return this.inputForm.get('portalInfo.employeeNumber') as FormControl;
  }
  get department() {
    return this.inputForm.get('portalInfo.department') as FormControl;
  }
  get section() {
    return this.inputForm.get('portalInfo.section') as FormControl;
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
    private _departmentService: OrganizationService,
    private _facadeTaskMaster: TaskMasterFacade,
    private _dialogService : DialogService
  ) {
    super(injector);
    this._technicianFacade.resetParams();
  }

  ngOnInit(): void {
    this._facadeTaskMaster.loadAllSkill();
    this._locationFacade.loadAll();
    this.skills$ = this._facadeTaskMaster.skills$.subscribe((x) => {
      console.log(x);
      this.skillList = x;
    });
    this.location$ = this._locationFacade.bodyShop$.subscribe((x) => {
      console.log(x);
      this.locationList = x;
    });

    this._taskMasterService.skills().subscribe((x) => {
      let data = x.message;
      this.skillsB = data.map((y) => ({ id: y.id, name: y.name }));
    });
    this._locationService.loadAll().subscribe((x) => {
      let data = x.message;
      this.locationsB = data.map((y) => ({ id: y.id, address: y.address }));
    });
    this.buildForm();
    this.route.url.subscribe((params) => {
      this.isEdit =
        params.filter((x) => x.path == 'edit-technician').length > 0
          ? true
          : false;

      if (this.isEdit) {
        this.handleEdit(params);
      } else {
        this.formChangesSubscription = this.inputForm.valueChanges.subscribe(
          (formValues) => {
            if (formValues.portalInfo.employeeNumber.name) {
              this.inputForm.controls['personalInfo'].patchValue(
                {
                  firstName: formValues.portalInfo.employeeNumber.nameEn,
                  lastName: formValues.portalInfo.employeeNumber.name
                },
                { emitEvent: false }
              );
            }
          }
        );
      }
    });
    this.departmentSerive$ = this._departmentService
      .loadWithPagination()
      .subscribe((x) => {
        x.message
          ? (this.departmentList = x.message)
          : (this.departmentList = []);
      });
    this._technicianFacade.submitted$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('success' , 
        (this.isEdit ? 'Edit technician': 'Add new technician' ), 
        (this.isEdit ? 'Changes Saved Successfully' : 'technician Added Successfully'),'Ok')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
            this.router.navigate(['/workshop/body-shop'] , { queryParams: { id: 'technicianTab' }}).then(()=>{
              this._technicianFacade.loadAll();
            });
          }
          dialogClose$?.unsubscribe();
          })
        ).subscribe()
      }
    });

    this._technicianFacade.error$.subscribe((x) => {
      if (x?.error) {
        const dialog = this._dialogService.show('danger' , 
          (this.isEdit ? 'Edit technician': 'Add new technician' ), 
          'We Have Some Error','Ok')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
          }
          dialogClose$?.unsubscribe();
          })
        ).subscribe()
      }
    });
    this.getEmployeesList.pipe(debounceTime(600)).subscribe((x) => {
      this.userService.searchEmployee(x['query']).subscribe((y) => {
        if (y) {
          this.employees.next([{ ...y.message, employeeId: x['query'] }]);
        } else {
          this.employees.next(null);
        }
      });
    });
  }

  private handleEdit(params) {
    this.id = +params[params.length - 1].path;
    this._technicalService
      .getTechnicianById(params[params.length - 1].path)
      .pipe(map((x) => x.message))
      .subscribe((x) => {
        if (x) {
          this._technician = x;
          this.avatarId = Array.isArray(x.user.profileDocId)
            ? x.user.profileDocId
            : [x.user.profileDocId];
          console.log(x);
          this.inputForm.controls['portalInfo'].patchValue({
            employeeNumber: {
              organizationId: x.user.employeeNumber
            },
            active: x.user.isActive,
            payPerHours: x.payPerHour,
            department: {
              organizationName: x.user.department.organizationName,
              id: x.user.department.organizationId
            },
            section: {
              name: x.user.department.name,
              id: x.user.department.id
            }
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
            emailCheckbox: false
          });

          for (let i = 0; i < x.skills.length; i++) {
            this.getSkill.controls[i].patchValue(x.skills[i]);
            if (i != x.skills.length - 1) {
              this.addSkill();
            }
          }
          for (let i = 0; i < x.locations.length; i++) {
            this.getLocation.controls[i].patchValue({
              address: x.locations[i].address,
              id: x.locations[i].id
            });
            if (i != x.locations.length - 1) {
              this.addLocation();
            }
          }
          this.emails.controls = [];
          for (let i = 0; i < x.user.emails.length; i++) {
            this.addEmail();
            this.emails.controls[i].patchValue(x.user.emails[i]);
          }
          this.phoneNumbers.controls = [];
          for (let i = 0; i < x.user.phoneNumbers.length; i++) {
            this.addPhoneNumber();
            this.phoneNumbers.controls[i].patchValue(x.user.phoneNumbers[i]);
          }

          this.inputForm.controls['personalInfo']
            .get('firstName')
            .markAsDirty();
          this.inputForm.controls['personalInfo'].get('lastName').markAsDirty();
          this.emails.controls[0].markAsDirty();
        }
      });
  }

  private buildForm() {
    this.inputForm = this._fb.group({
      // organizationId: [null, [Validators.required]],
      // departmentId: [null, [Validators.required]],
      portalInfo: this._fb.group({
        employeeNumber: ['', Validators.compose([Validators.required , this.autocompleteEmployeeNumberValidation])],
        payPerHours: ['', [Validators.required]],
        department: ['', Validators.compose([Validators.required , this.autocompleteDepartmentValidation])],
        section: ['', Validators.compose([Validators.required , this.autocompleteNameValidation])],
        active: [false]
      }),
      professional: this._fb.group({
        skills: this._fb.array([this._fb.control('', Validators.compose([Validators.required , this.autocompleteNameValidation]))]),
        location: this._fb.array([this._fb.control('', Validators.compose([Validators.required , this.autocompleteAddressValidation]))])
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
  searchDepartment(event) {
    let query = event.query;
    let filtered = [];
    for (let index = 0; index < this.departmentList.length; index++) {
      let department = this.departmentList[index];
      if (
        department.organizationName
          .toLowerCase()
          .indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(department);
      }
    }
    this.departmentFiltered = filtered;
  }
  searchSection(event) {
    let query = event.query;
    let filtered = [];
    for (let index = 0; index < this.sectionList.length; index++) {
      let section = this.sectionList[index];
      if (section.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(section);
      }
    }
    this.sectionFiltered = filtered;
  }

  departmentChanged($event) {
    this.department_static = $event;
    if (typeof $event != 'object') return;
    this.sectionList = [];
    this.inputForm.get('portalInfo.section').patchValue(null);
    this.departmentId = $event.id;
    this._departmentService.searchDepartment($event.id).subscribe((x) => {
      x.message.departments
        ? (this.sectionList = x.message.departments)
        : (this.sectionList = []);
    });
  }

  sectionChanged($event) {
    this.section_static = $event;
    if (typeof $event != 'object') return;
    this.sectionId = $event.id;
  }

  getAllSkill(event) {
    let query = event.query;
    let filtered = [];
    for (let index = 0; index < this.skillList.length; index++) {
      let skill = this.skillList[index];
      if (skill.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(skill);
      }
    }
    this.skillFiltered = filtered;
  }

  getFilteredLocation(event) {
    let query = event.query;
    let filtered = [];
    for (let index = 0; index < this.locationList.length; index++) {
      let location = this.locationList[index];
      if (location.address.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(location);
      }
    }
    this.locationFiltered = filtered;
  }

  filterLocation(event) {
    this.locations = this.locationsB.filter(
      (x) =>
        (x.id + '').indexOf(event.query) >= 0 ||
        x.name.indexOf(event.query) >= 0
    );
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
    const skill = new FormControl(null, Validators.compose([Validators.required , this.autocompleteNameValidation]));
    (<FormArray>this.inputForm.get('professional.skills')).push(skill);
  }
  removeSkill(i) {
    this.getSkill.removeAt(i);
  }
  addLocation() {
    if (this.inputForm.get('professional.location').invalid) {
      return;
    }
    const location = new FormControl(null, Validators.compose([Validators.required , this.autocompleteAddressValidation]));
    (<FormArray>this.inputForm.get('professional.location')).push(location);
  }
  removeLocation(i) {
    this.getLocation.removeAt(i);
  }
  addEmail() {
    const email = new FormControl(null, [Validators.required]);
    (<FormArray>this.inputForm.get('personalInfo.email')).push(email);
  }
  removeEmail(index) {
    this.emails.removeAt(index);
  }
  addPhoneNumber() {
    const phoneNumber = new FormControl(null, [Validators.required]);
    (<FormArray>this.inputForm.get('personalInfo.phoneNumber')).push(
      phoneNumber
    );
  }
  removePhoneNumber(index) {
    this.phoneNumbers.removeAt(index);
  }


  getPhone(f) {
    if (f.personalInfo.phoneNumber && f.personalInfo.phoneNumber.length > 0) {
      if (typeof f.personalInfo.phoneNumber[0] == 'object') {
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
    // this.inputForm.get('organizationId').patchValue($event.organizationId);
    // this.inputForm.get('departmentId').patchValue($event.organizationId);
    this.inputForm.get('personalInfo').patchValue({
      phoneNumber: [$event.mobileNumber],
      email: [$event.emailAddress],
      firstName: $event.nameEn,
      lastName: $event.name
    });
    this.inputForm.get('personalInfo.firstName').markAsDirty();
    this.inputForm.get('personalInfo.lastName').markAsDirty();
    this.inputForm.get('personalInfo.email')['controls'][0].markAsDirty();
    this.inputForm.get('personalInfo.phoneNumber')['controls'][0].markAsDirty();
  }

  addRequest() {
    this.submited = true;
    if (
      this.getSkill.length > 1 &&
      this.getSkill.controls[this.getSkill.length - 1].value == null
    ) {
      this.removeSkill(this.getSkill.length - 1);
    }
    if (
      this.getLocation.length > 1 &&
      this.getLocation.controls[this.getLocation.length - 1].value == null
    ) {
      this.removeLocation(this.getLocation.length - 1);
    }
    if (this.inputForm.invalid) {
      this.inputForm.markAllAsTouched();
      return;
    }
    const dialog = this._dialogService.show('warning' , 
    (this.isEdit ? 'Edit technician' : 'Add new technician') ,
    (this.isEdit ? 'Are you sure you want to submit this changes?' : 'Are you sure you want to add new technician?') , 'Yes','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
      .pipe(
        tap((result) => {
          
        if (result === 'confirm') {
          let f = this.inputForm.value;
          let technicianInfo: any = {
            employeeNumber: this.isEdit
              ? this._technician?.employeeNumber
              : this.employeeId,
            organizationId: +f.portalInfo.department.id,
            departmentId: +f.portalInfo.section.id,
            payPerHour: f.portalInfo.payPerHours,
            isActive: f.portalInfo.active,
            profileDocId: this.profileDocId || 1,
            skillIds: f.professional.skills.map((s) => s.id),
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
            notifyByWhatsapp: f.personalInfo.notification.whatsapp,
            notifyByEmail: f.personalInfo.notification.email
          };

          if (this.isEdit) {
            technicianInfo = {
              ...technicianInfo,
              id: this.id
            };

            this._technicianFacade.editTechnician(technicianInfo);
          } else {
            technicianInfo = {
              ...technicianInfo
            };
            this._technicianFacade.addTechnician(technicianInfo);
          }

        }
        dialogClose$?.unsubscribe();
      })
    ).subscribe();
  }

  cancelForm() {
    const dialog = this._dialogService.show('warning' , 'Are you sure you want to leave?' , 'You have unsaved changes! If you leave, your changes will be lost.' , 'Yes','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
    .pipe(
      tap((result) => {
      if (result === 'confirm') {
        this.router.navigate(['/workshop/body-shop'] , { queryParams: { id: 'technicianTab' }});
      }
      dialogClose$?.unsubscribe();
      })
    ).subscribe();
  }

  uploadImage($event) {
    if (!$event || !$event.files) {
      return;
    }
    const docId = $event.files[0];
    this.profileDocId = docId;
  }

  /* Custom validation */
  autocompleteEmployeeNumberValidation(input: FormControl) {
    if(input.value && input.value !== null){
      const inputValid = input.value.employeeId;
      if (inputValid) {
        return null;
      } else {
        return { needsExclamation: true };
      }
    }
  }
  autocompleteDepartmentValidation(input: FormControl) {
    if(input.value && input.value !== null){
      const inputValid = input.value.organizationName;
      if (inputValid) {
        return null;
      } else {
        return { needsExclamation: true };
      }
    }
  }
  autocompleteNameValidation(input: FormControl) {
    if(input.value && input.value !== null){
      const inputValid = input.value.name;
      if (inputValid) {
        return null;
      } else {
        return { needsExclamation: true };
      }
    }
  }
  autocompleteAddressValidation(input: FormControl) {
    if(input.value && input.value !== null){
      const inputValid = input.value.address;
      if (inputValid) {
        return null;
      } else {
        return { needsExclamation: true };
      }
    }
  }

  autocompleteErrorMessage(formControl:FormControl){
    if(formControl.invalid && formControl.errors && formControl.errors !== null){
      if(formControl.errors.required){
        return;
      }
      return formControl.errors.needsExclamation
    }
  }
}

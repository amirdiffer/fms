import { Component, OnInit, Injector } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterCardSetting } from '@core/filter';
import {
  OperatorFacade,
  OperatorService
} from '@feature/fleet/+state/operator';
import {
  OrganizationService
} from '@feature/fleet/+state/organization';
import { IOperator } from '@models/operator';
import { Utility } from '@shared/utility/utility';

import { Subject, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { IOrganization } from '@models/organization';
import { DialogService } from '@core/dialog/dialog-template.component';
@Component({
  selector: 'anms-add-operator',
  templateUrl: './add-operator.component.html',
  styleUrls: ['./add-operator.component.scss']
})
export class AddOperatorComponent extends Utility implements OnInit {

  //#region Filter

  filter: FilterCardSetting[] = [
    {
      isCalendar: true,
      filterTitle: 'statistic.this_month',
      filterCount: '0',
      filterTagColor: '#fff',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.total',
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      filterSupTitle: 'statistic.operator',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '08',
      filterTagColor: '#6870B4',
      filterSupTitle: 'statistic.operator',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '02',
      filterTagColor: '#BA7967',
      filterSupTitle: 'statistic.operator',
      onActive(index: number) { }
    }
  ];

  //#endregion

  //#region Variables
  profileDocId = null;
  sectionFiltered: any[];
  sectionList: any[] = [];
  isEdit: boolean = false;
  id: number;
  allDepartment: IOrganization[] = [];

  progressBarValue = 50;
  bufferValue = 70;
  formChangesSubscription!: Subscription;
  form: FormGroup;
  submited = false;

  employees = new Subject();
  employees$ = this.employees.asObservable();
  getEmployeesList = new Subject();

  departmentSerive$: Subscription;
  departmentList: any[];
  departmentFiltered: any[];
  employee_static;
  department_static;
  employeeId;
  departmentId;
  sectionId;
  avatarId = [];

  departments = [];

  roles = [
    { name: 'Police', id: 1 },
    { name: 'Manager', id: 2 },
    { name: 'Admin', id: 3 },
    { name: 'Operator', id: 4 }
  ];

  tempImage: any = '';

  get emails(): FormArray {
    return this.form.get('personalInformation').get('emails') as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.form
      .get('personalInformation')
      .get('phoneNumbers') as FormArray;
  }

  private _operator: IOperator;
  operators$ = this.operatorFacade.operator$;
  //#endregion


  /* Autocomplete formControl */
  get department() {
    return this.form.get('portalInformation.department') as FormControl;
  }
  get section() {
    return this.form.get('portalInformation.section') as FormControl;
  }

  get employeeNumber() {
    return this.form.get('portalInformation.employeeNumber') as FormControl;
  }
  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    private operatorFacade: OperatorFacade,
    private operatorService: OperatorService,
    private _departmentService: OrganizationService,
    private _dialogService: DialogService
  ) {
    super(injector);
    this.operatorFacade.resetParams();
  }

  ngOnInit(): void {
    this.buildForm();
    this.departmentSerive$ = this._departmentService
      .loadWithPagination()
      .subscribe((x) => {
        x.message
          ? // ? this.department.next(x.message)
          (this.departmentList = x.message)
          : (this.departmentList = []);
      });
    this.route.url.subscribe((params) => {
      this.isEdit =
        params.filter((x) => x.path == 'edit-operator').length > 0
          ? true
          : false;

      if (this.isEdit) {
        this.id = +params[params.length - 1].path;
        this.operatorService
          .getOperatorById(params[params.length - 1].path)
          .pipe(map((x) => x.message))
          .subscribe((x) => {
            if (x) {
              this._operator = x;
              this.departmentId = this._operator.department.organizationId;
              this.sectionId = this._operator.department.id;
              this.form.controls['portalInformation'].patchValue({
                employeeNumber: x.employeeNumber,
                department: {
                  organizationName: x.department.organizationName,
                  id: x.department.organizationId
                },
                section: {
                  name: x.department.name,
                  id: x.department.id
                },
                roleId: 1,
                activeEmployee: x.isActive
              });

              this.form.controls['personalInformation'].patchValue({
                firstName: x.firstName,
                lastName: x.lastName,
                callCheckbox: x.notifyByCall,
                smsCheckbox: x.notifyBySMS,
                emailCheckbox: x.notifyByEmail,
                whatsappCheckbox: x.notifyByWhatsApp
              });

              this.emails.controls = [];
              this.emails.controls = [];
              for (let i = 0; i < x.emails.length; i++) {
                this.emails.controls.push(this.createEmailField());
              }
              this.emails.patchValue(x.emails.map((y) => ({ email: y })));

              this.phoneNumbers.controls = [];
              for (let i = 0; i < x.phoneNumbers.length; i++) {
                this.phoneNumbers.controls.push(this.createPhoneField());
              }
              this.phoneNumbers.patchValue(
                x.phoneNumbers.map((y) => ({ phoneNumber: y }))
              );

              this.form.controls['fileUpload'].patchValue({
                fileName: x.profileDocId
              });
              this.avatarId = [x.profileDocId];
            }
          });
      } else {
        this.formChangesSubscription = this.form.valueChanges.subscribe(
          (formValues) => {
            if (formValues.portalInformation.employeeNumber.name) {
              this.form.controls['personalInformation'].patchValue(
                {
                  firstName: formValues.portalInformation.employeeNumber.name,
                  lastName: formValues.portalInformation.employeeNumber.name
                },
                { emitEvent: false }
              );
            }
          }
        );
      }
    });

    this.operatorFacade.submitted$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('success',
          (this.isEdit ? 'Edit Operator' : 'Add new Operator'),
          (this.isEdit ? 'Changes Saved Successfully' : 'Operator Added Successfully'), 'Ok')
        const dialogClose$: Subscription = dialog.dialogClosed$
          .pipe(
            tap((result) => {
              if (result === 'confirm') {
                this.router.navigate(['/fleet/operator']);
              }
              dialogClose$?.unsubscribe();
            })
          ).subscribe()
        this.operatorFacade.loadAll();
      }
    });

    this.operatorFacade.error$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('danger',
          (this.isEdit ? 'Edit Operator' : 'Add new Operator'),
          'We Have Some Error', 'Ok')
        const dialogClose$: Subscription = dialog.dialogClosed$
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
      this.operatorService.searchEmployee(x['query']).subscribe((y) => {
        if (y) {
          this.employees.next([{ ...y.message, employeeId: x['query'] }]);
        } else {
          this.employees.next(null);
        }
      });
    });
    // this.getDepartmentList.pipe(debounceTime(600)).subscribe((x) => {
    //   this._departmentService.searchDepartment(x['query']).subscribe((y) => {
    //     if (y) {
    //       console.log(y)
    //       this.department.next([y.message]);
    //     } else {
    //       this.department.next(null);
    //     }
    //   });
    // });
  }

  ngAfterContentInit(): void {
    this.formChangesSubscription?.unsubscribe();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      portalInformation: this.formBuilder.group({
        employeeNumber: ['', [Validators.required , this.autocompleteEmployeeIDValidation]],
        department: ['', [Validators.required , this.autocompleteDepartmentValidation]],
        section: ['', [Validators.required , this.autocompleteSectionValidation]],
        roleId: ['1'],
        activeEmployee: false
      }),
      fileUpload: this.formBuilder.group({
        fileName: 'file.pdf',
        fileSize: '00 MB',
        file: [undefined]
      }),
      personalInformation: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        emails: new FormArray([this.createEmailField()]),
        phoneNumbers: new FormArray([this.createPhoneField()]),
        callCheckbox: false,
        smsCheckbox: false,
        emailCheckbox: false,
        whatsappCheckbox: false
      })
    });
  }

  createEmailField(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addEmailField(): void {
    if (this.form.get('personalInformation').get('emails').invalid) {
      return;
    }
    this.emails.push(this.createEmailField());
  }
  removeEmailField(index) {
    this.emails.removeAt(index);
  }
  createPhoneField(): FormGroup {
    return this.formBuilder.group({
      phoneNumber: ['', []]
    });
  }

  addPhoneField(): void {
    if (this.form.get('personalInformation').get('phoneNumbers').invalid) {
      return;
    }
    this.phoneNumbers.push(this.createPhoneField());
  }
  removePhoneField(index) {
    this.phoneNumbers.removeAt(index);
  }
  dialogConfirm($event): void {

  }

  cancel(): void {
    const dialog = this._dialogService.show('warning', 'Are you sure you want to leave?', 'You have unsaved changes! If you leave, your changes will be lost.', 'Ok', 'Cancel')
    const dialogClose$: Subscription = dialog.dialogClosed$
      .pipe(
        tap((result) => {
          if (result === 'confirm') {
            this.router.navigate(['/fleet/operator']);
          }
          dialogClose$?.unsubscribe();
        })
      ).subscribe();
  }

  submit(): void {
    this.submited = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let f = this.form.value;
    let operatorInfo: any = {
      employeeNumber: this.isEdit
        ? this._operator?.employeeNumber
        : this.employeeId,
      organizationId: this.departmentId,
      // departmentId: f.portalInformation.department.id || 1,
      departmentId: this.sectionId,
      roleIds: [1],
      isActive: f.portalInformation.activeEmployee,
      profileDocId: this.profileDocId || 1,
      firstName: f.personalInformation.firstName,
      lastName: f.personalInformation.lastName,
      emails: f.personalInformation.emails.map((x) => {
        if (x.email) {
          if (typeof x.email == 'string') return x.email;
          else return x.email[0];
        } else if (typeof x == 'object') return x[0];
      }),
      phoneNumbers: this.getPhone(f),
      notifyByCall: f.personalInformation.callCheckbox,
      notifyBySMS: f.personalInformation.smsCheckbox,
      notifyByWhatsApp: f.personalInformation.whatsappCheckbox,
      notifyByEmail: f.personalInformation.emailCheckbox
    };

    if (this.isEdit) {
      operatorInfo = {
        ...operatorInfo,
        id: this.id,
        notifyByPush: this._operator.notifyByPush || false,
        vehicleComments: this._operator.vehicleComments || false,
        serviceEntryComment: this._operator.serviceEntryComment || false,
        fuelEntryComments: this._operator.fuelEntryComments || false,
        vehicleStatusChanges: this._operator.vehicleStatusChanges || false,
        voidedFuelEntries: this._operator.voidedFuelEntries || false,
        dueSoonInspections: this._operator.dueSoonInspections || false,
        overdueInspections: this._operator.overdueInspections || false,
        newFaults: this._operator.newFaults || false,
        newRecalls: this._operator.newRecalls || false,
        notifyByNewIssueEmail: this._operator.notifyByNewIssueEmail || false,
        notifyByNewIssuePush: this._operator.notifyByNewIssuePush || false,
        notifyByIssueAssignedEmail:
          this._operator.notifyByIssueAssignedEmail || false,
        notifyByIssueAssignedPush:
          this._operator.notifyByIssueAssignedPush || false,
        notifyByCommentOnIssueEmail:
          this._operator.notifyByCommentOnIssueEmail || false,
        notifyByCommentOnIssuePush:
          this._operator.notifyByCommentOnIssuePush || false,
        notifyByIssueResolvedEmail:
          this._operator.notifyByIssueResolvedEmail || false,
        notifyByIssueResolvedPush:
          this._operator.notifyByIssueResolvedPush || false,
        notifyByIssueCloseEmail:
          this._operator.notifyByIssueCloseEmail || false,
        notifyByIssueClosePush: this._operator.notifyByIssueClosePush || false
      };

      operatorInfo;
      const dialog = this._dialogService.show('warning', 'Edit Operator', 'Are you sure you want to edit operator?', 'Yes', 'Cancel')
      const dialogClose$: Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
            if (result === 'confirm') {
              this.operatorFacade.editOperator(operatorInfo);
            }
            dialogClose$?.unsubscribe();
          })
        ).subscribe();

    } else {
      operatorInfo = {
        ...operatorInfo,
        notifyByPush: false,
        vehicleComments: false,
        serviceEntryComment: false,
        fuelEntryComments: false,
        vehicleStatusChanges: false,
        voidedFuelEntries: false,
        dueSoonInspections: false,
        overdueInspections: false,
        newFaults: false,
        newRecalls: false,
        notifyByNewIssueEmail: false,
        notifyByNewIssuePush: false,
        notifyByIssueAssignedEmail: false,
        notifyByIssueAssignedPush: false,
        notifyByCommentOnIssueEmail: false,
        notifyByCommentOnIssuePush: false,
        notifyByIssueResolvedEmail: false,
        notifyByIssueResolvedPush: false,
        notifyByIssueCloseEmail: false,
        notifyByIssueClosePush: false
      };
      this.operatorFacade.addOperator(operatorInfo);
    }
  }

  filterDepartments(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.departments = [
      { organizationName: 'Dapartment 1', id: 1 },
      { organizationName: 'Dapartment 2', id: 2 },
      { organizationName: 'Dapartment 3', id: 3 },
      { organizationName: 'Dapartment 4', id: 4 },
      { organizationName: 'Dapartment 5', id: 5 },
      { organizationName: 'Dapartment 6', id: 6 }
    ];
  }


  employeeNumberChanged($event) {
    this.employee_static = $event;
    if (typeof $event != 'object') return;
    this.form.controls['portalInformation'].patchValue({
      department: $event.organizationId
      // employeeNumber:$event.organizationId
    });
    this.form.controls['fileUpload'].patchValue({
      file: $event.profileImage
    });
    this.form.controls['personalInformation'].patchValue({
      firstName: $event.nameEn,
      lastName: $event.name,
      phoneNumbers: [{ phoneNumber: $event.mobileNumber }],
      emails: [{ email: $event.emailAddress }]
    });
  }

  departmentChanged($event) {
    this.department_static = $event;
    if (typeof $event != 'object') return;
    this.sectionList = [];
    this.form.get('portalInformation.section').patchValue(null);
    this.departmentId = $event.id;
    this._departmentService.searchDepartment($event.id).subscribe((x) => {
      x.message.departments
        ? (this.sectionList = x.message.departments)
        : (this.sectionList = []);
    });
  }

  sectionChanged($event) {
    if (typeof $event != 'object') return;
    this.sectionId = $event.id;
  }

  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }

  ngOnDestroy(): void {
    this.formChangesSubscription?.unsubscribe();
  }

  getPhone(f) {
    if (
      f.personalInformation.phoneNumbers &&
      f.personalInformation.phoneNumbers.length > 0
    ) {
      if (typeof f.personalInformation.phoneNumbers[0] == 'object') {
        if (
          typeof f.personalInformation.phoneNumbers[0] == 'object' &&
          typeof f.personalInformation.phoneNumbers[0].phoneNumber ==
          'string' &&
          f.personalInformation.phoneNumbers[0].phoneNumber.length < 5
        )
          return [];
      } else if (typeof f.personalInformation.phoneNumbers[0] == 'string') {
        if (f.personalInformation.phoneNumbers[0].length < 5) return [];
      }
      return f.personalInformation.phoneNumbers.map((x) => {
        if (!x) return;
        if (x.phoneNumber) {
          if (typeof x.phoneNumber == 'string') return x.phoneNumber;
          else return x.phoneNumber[0];
        } else if (typeof x == 'object') {
          if (x.phoneNumber) return x.phoneNumber;
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

  // getDepartment(event) {
  //   this.getDepartmentList.next(event);
  //   this.departmentId = event.query
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

  successDialogConfirm($event) {
    this.router.navigate(['fleet/operator']).then((_) => {
      this.operatorFacade.resetParams();
    });
  }

  uploadImage($event) {
    if (!$event || !$event.files) {
      return;
    }
    const docId = $event.files[0];
    this.profileDocId = docId;
  }

  
  /* Custom validation */
  autocompleteEmployeeIDValidation(input: FormControl) {
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
  autocompleteSectionValidation(input: FormControl) {
    if(input.value && input.value !== null){
      const inputValid = input.value.name;
      if (input.value.name) {
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

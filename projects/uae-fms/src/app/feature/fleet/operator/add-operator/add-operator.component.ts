import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector,
  ChangeDetectorRef
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { FilterCardSetting } from '@core/filter';
import {
  OperatorFacade,
  OperatorService
} from '@feature/fleet/+state/operator';
import { OrganizationFacade, OrganizationService } from '@feature/fleet/+state/organization';
import { IOperator } from '@models/operator';
import { Utility } from '@shared/utility/utility';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { IOrganization } from '@models/organization'
@Component({
  selector: 'anms-add-operator',
  templateUrl: './add-operator.component.html',
  styleUrls: ['./add-operator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOperatorComponent extends Utility implements OnInit {
  profileDocId = null;

  isEdit: boolean = false;
  id: number;
  allDepartment: IOrganization[] = [];
  //#region Dialog
  dialogSetting: IDialogAlert = {
    header: 'Add new operator alert',
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

  successDialogSetting: IDialogAlert = {
    header: 'Operator',
    message: 'The operation was successful',
    confirmButton: 'Ok',
    isWarning: false,
    hasError: false,
    hasHeader: true,
    cancelButton: undefined
  };

  successDialogModal = false;

  dialogModal = false;
  dialogType = null;
  errorDialogModal = false;
  //#endregion

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

  progressBarValue = 50;
  bufferValue = 70;
  public filesUpdloaded: NgxFileDropEntry[] = [];
  formChangesSubscription!: Subscription;
  form: FormGroup;
  submited = false;

  employees = new Subject();
  employees$ = this.employees.asObservable();
  getEmployeesList = new Subject();

  departmentSerive$: Subscription;
  departmentList: any[]
  departmentFiltered: any[]
  employee_static;
  department_static;
  employeeId;
  departmentId;
  avatarId = []

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

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    private operatorFacade: OperatorFacade,
    private changeDetector: ChangeDetectorRef,
    private operatorService: OperatorService,
    private _departmentService: OrganizationService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.buildForm();
    this.departmentSerive$ = this._departmentService.loadWithPagination().subscribe(
      (x) => {
        console.log(x)
        x.message
          // ? this.department.next(x.message)
          ? this.departmentList = x.message
          : this.departmentList = []
      }
    )
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
              this.form.controls['portalInformation'].patchValue({
                employeeNumber: x.employeeNumber,
                department: {
                  organizationName: x.department.organizationName,
                  id: x.department.organizationId
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
                whatsappCheckbox: x.notifyByWhatsApp,

              });


              this.emails.controls = [];
              this.emails.controls = [];
              for (let i = 0; i < x.emails.length; i++) {
                this.emails.controls.push(
                  this.createEmailField()
                );
              }
              this.emails.patchValue(x.emails.map(y => ({ email: y })))

              this.phoneNumbers.controls = [];
              for (let i = 0; i < x.phoneNumbers.length; i++) {
                this.phoneNumbers.controls.push(
                  this.createPhoneField()
                )
              }
              this.phoneNumbers.patchValue(x.phoneNumbers.map(y => ({ phoneNumber: y })))


              this.form.controls['fileUpload'].patchValue({
                fileName: x.profileDocId
              });
              this.avatarId = [x.profileDocId]

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
        this.successDialogModal = true;

        this.successDialogSetting.header = this.isEdit
          ? 'Edit operator'
          : 'Add new operator';
        this.successDialogSetting.message = this.isEdit
          ? 'Changes Saved Successfully'
          : 'Operator Added Successfully';
        this.successDialogSetting.isWarning = false;
        this.successDialogSetting.hasError = false;
        this.successDialogSetting.confirmButton = 'Ok';
        this.successDialogSetting.cancelButton = undefined;
        this.changeDetector.detectChanges();
      }
    });

    this.operatorFacade.error$.subscribe((x) => {
      if (x) {
        if (x?.error?.error && x.error.message) this.errorDialogSetting.message = x.error.message;
        else this.errorDialogSetting.message = "Error occurred in progress";

        this.errorDialogModal = true;
        this.errorDialogSetting.header = this.isEdit
          ? 'Edit operator'
          : 'Add new operator';
        this.errorDialogSetting.hasError = true;
        this.errorDialogSetting.cancelButton = undefined;
        this.errorDialogSetting.confirmButton = 'Ok';
        this.changeDetector.detectChanges();
      } else {
        this.errorDialogModal = false;
      }
    });

    this.getEmployeesList.pipe(debounceTime(600)).subscribe((x) => {
      this.operatorService.searchEmployee(x['query']).subscribe((y) => {
        if (y) {
          console.log(y)
          this.employees.next([y.message]);
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
        employeeNumber: ['', [Validators.required]],
        department: ['', [Validators.required]],
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
    console.log('email')
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
    this.emails.removeAt(index)
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
    this.phoneNumbers.removeAt(index)
  }
  dialogConfirm($event): void {
    this.errorDialogModal = false;
    this.dialogModal = false;
    if (!$event) return;

    if (this.dialogType == 'submit') {
      let f = this.form.value;
      let operatorInfo: any = {
        employeeNumber: this.isEdit
          ? this._operator?.employeeNumber
          : this.employeeId,
        organizationId: 1,
        // departmentId: f.portalInformation.department.id || 1,
        departmentId: this.isEdit ? this._operator?.department.id : this.departmentId,
        roleId: 1,
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
        this.operatorFacade.editOperator(operatorInfo);
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
    } else {
      this.router.navigate(['/fleet/operator']).then((_) => {
        this.operatorFacade.resetParams();
      });
    }
  }

  cancel(): void {
    this.dialogModal = true;
    this.dialogType = 'cancel';
    if (this.isEdit) {
      this.dialogSetting.header = 'Edit operator';
      this.dialogSetting.hasError = false;
      this.dialogSetting.isWarning = true;
      this.dialogSetting.message =
        'Are you sure that you want to cancel editing operator?';
      this.dialogSetting.confirmButton = 'Yes';
      this.dialogSetting.cancelButton = 'Cancel';
      return;
    }

    this.dialogSetting.header = 'Add new operator';
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message =
      'Are you sure that you want to cancel adding new operator?';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'Cancel';
  }

  submit(): void {
    console.log(this.form.value)
    this.submited = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }

    this.dialogModal = true;
    this.dialogType = 'submit';
    if (this.isEdit) {
      this.dialogSetting.header = 'Edit operator';
      this.dialogSetting.message =
        'Are you sure you want to submit this changes?';
      this.dialogSetting.isWarning = true;
      this.dialogSetting.confirmButton = 'Yes';
      this.dialogSetting.cancelButton = 'Cancel';
      return;
    } else {
      this.dialogSetting.header = 'Add new operator';
      this.dialogSetting.isWarning = true;
      this.dialogSetting.hasError = false;
      this.dialogSetting.message = 'Are you sure you want to add new operator?';
      this.dialogSetting.confirmButton = 'OK';
      this.dialogSetting.cancelButton = 'Cancel';
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

  public dropped(files: NgxFileDropEntry[]) {
    this.filesUpdloaded = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.tempImage = reader.result;
            this.form.controls['fileUpload'].patchValue({
              fileName: file.name,
              fileSize: file.size,
              file: reader.result
            });
          };
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
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
    this.departmentId = $event.id
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
    let query = event.query
    let filtered = []
    for (let index = 0; index < this.departmentList.length; index++) {
      let department = this.departmentList[index];
      if (department.organizationName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(department)
      }
    }
    this.departmentFiltered = filtered
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
}

import {
  AfterContentInit,
  Component,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, filter, map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import { UsersFacade } from '../../../+state/users';
import { RolePermissionFacade } from '../../../+state/role-permission';
import { UsersService } from '../../../+state/users/users.service';

import { FilterCardSetting } from '@core/filter';
import { Utility } from '@shared/utility/utility';
import { OrganizationFacade } from '@feature/fleet/+state/organization';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
@Component({
  selector: 'anms-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent
  extends Utility
  implements OnInit, AfterContentInit, OnDestroy {
  isEdit: boolean = false;
  id: number;

  //#region Dialog
  dialogSetting: IDialogAlert = {
    header: 'Add new user alert',
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
      filterSupTitle: 'statistic.user',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '08',
      filterTagColor: '#6870B4',
      filterSupTitle: 'statistic.user',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '02',
      filterTagColor: '#BA7967',
      filterSupTitle: 'statistic.user',
      onActive(index: number) { }
    }
  ];

  //#endregion

  progressBarValue = 50;
  bufferValue = 70;
  public filesUpdloaded: NgxFileDropEntry[] = [];
  formChangesSubscription!: Subscription;
  departmentSubscription: Subscription;
  form: FormGroup;
  submited = false;

  employees = new Subject();
  employees$ = this.employees.asObservable();
  getEmployeesList = new Subject();
  employee_static;
  employeeId;

  departments = [];
  departmentsB;

  tempImage: any = '';

  get emails(): FormArray {
    return this.form.get('personalInformation').get('emails') as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.form
      .get('personalInformation')
      .get('phoneNumbers') as FormArray;
  }

  private _user;
  users$ = this.userFacade.users$;
  roles$ = this.roleFacade.rolePermission$.pipe(
    map((y) => y.map((x) => ({ id: x.roleId, name: x.roleName })).filter(z => z.id != 1 && z.id != 2 && z.id != 3))
  );
  profileDocId = null;

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    private userFacade: UsersFacade,
    private _orgfacade: OrganizationFacade,
    private roleFacade: RolePermissionFacade,
    private userService: UsersService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.roleFacade.loadAll();
    this._orgfacade.loadAll();
    this.departmentSubscription = this._orgfacade.organization$.subscribe(
      (x) => {
        this.departmentsB = x.map((y) => ({
          id: y.id,
          name: y['organizationName']
        }));
      }
    );
    this.buildForm();

    this.route.url.subscribe((params) => {
      this.isEdit =
        params.filter((x) => x.path == 'edit-user').length > 0 ? true : false;

      if (this.isEdit) {
        this.id = +params[params.length - 1].path;
        this.userService
          .getUserById(params[params.length - 1].path)
          .pipe(map((x) => x.message))
          .subscribe((x: any) => {
            if (x) {
              this.profileDocId = x.profileDocId ? x.profileDocId : null;
              this._user = x;
              this.getEmployeesList.next({ query: x.employeeNumber });

              this.form.controls['portalInformation'].patchValue({
                employeeNumber: x.employeeNumber,
                department: {
                  name: `${x.department.organizationName}`,
                  id: `${x.department.id}`
                },
                roleId: x.roles[0].roleId,
                activeEmployee: x.isActive
              });

              this.roleFacade.loaded$.subscribe((z) => {
                if (z)
                  this.roles$.subscribe((a) => {
                    this.form.controls['portalInformation'].patchValue({
                      ...this.form.controls['portalInformation'].value,
                      roleId: a.find((y) => y.id == x.roles[0].roleId)
                    });
                  });
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

              this.form.controls['personalInformation'].patchValue({
                firstName: x.firstName,
                lastName: x.lastName,
                callCheckbox: x.notifyByCall,
                smsCheckbox: x.notifyBySMS,
                whatsappCheckbox: x.notifyByWhatsApp,
                emailCheckbox: x.notifyByEmail
              });

              this.form.controls['fileUpload'].patchValue({
                fileName: x.profileDocId
              });
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

    this.userFacade.submitted$.subscribe((x) => {
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
      }
    });

    this.userFacade.error$.subscribe((x) => {
      if (x) {
        if (x?.error?.error && x.error.message)
          this.errorDialogSetting.message = x.error.message;
        else this.errorDialogSetting.message = 'Error occurred in progress';

        this.errorDialogModal = true;
        this.errorDialogSetting.header = this.isEdit
          ? 'Edit user'
          : 'Add new user';
        this.errorDialogSetting.hasError = true;
        this.errorDialogSetting.cancelButton = undefined;
        this.errorDialogSetting.confirmButton = 'Ok';
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

  ngAfterContentInit(): void {
    this.formChangesSubscription?.unsubscribe();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      portalInformation: this.formBuilder.group({
        employeeNumber: ['', [Validators.required]],
        department: ['', [Validators.required]],
        roleId: ['', [Validators.required]],
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

  createEmailField(value?): FormGroup {
    return this.formBuilder.group({
      email: [value ? value : '', [Validators.required, Validators.email]]
    });
  }

  addEmailField(): void {
    if (this.form.get('personalInformation').get('emails').invalid) {
      return;
    }
    this.emails.push(this.createEmailField());
  }

  createPhoneField(value?): FormGroup {
    return this.formBuilder.group({
      phoneNumber: [value ? value : '']
    });
  }

  addPhoneField(): void {
    if (this.form.get('personalInformation').get('phoneNumbers').invalid) {
      return;
    }
    this.phoneNumbers.push(this.createPhoneField());
  }

  dialogConfirm($event): void {
    this.errorDialogModal = false;
    this.dialogModal = false;
    if (!$event) return;

    if (this.dialogType == 'submit') {
      let f = this.form.value;
      console.log(f.portalInformation.roleId.id);
      let userInfo: any = {
        employeeNumber: this.isEdit
          ? this._user?.employeeNumber
          : this.employeeId,
        organizationId: 1,
        departmentId: f.portalInformation.department.id,
        roleIds: [f.portalInformation.roleId.id],
        isActive: f.portalInformation.activeEmployee,
        profileDocId: this.profileDocId,
        firstName: f.personalInformation.firstName,
        lastName: f.personalInformation.lastName,
        emails: f.personalInformation.emails.map((x) => {
          if (x.email) {
            if (typeof x.email == 'string') return x.email;
            else return x.email[0];
          } else if (typeof x == 'object') return x[0];
        }),
        phoneNumbers: Array.isArray(this.getPhone(f))
          ? (<Array<string>>this.getPhone(f)).filter((x) => x != '')
          : this.getPhone(f),
        notifyByCall: f.personalInformation.callCheckbox,
        notifyBySMS: f.personalInformation.smsCheckbox,
        notifyByWhatsApp: f.personalInformation.whatsappCheckbox,
        notifyByEmail: f.personalInformation.emailCheckbox
      };

      if (this.isEdit) {
        userInfo = {
          ...userInfo,
          id: this.id,
          notifyByPush: this._user.notifyByPush || false,
          vehicleComments: this._user.vehicleComments || false,
          serviceEntryComment: this._user.serviceEntryComment || false,
          fuelEntryComments: this._user.fuelEntryComments || false,
          vehicleStatusChanges: this._user.vehicleStatusChanges || false,
          voidedFuelEntries: this._user.voidedFuelEntries || false,
          dueSoonInspections: this._user.dueSoonInspections || false,
          overdueInspections: this._user.overdueInspections || false,
          newFaults: this._user.newFaults || false,
          newRecalls: this._user.newRecalls || false,
          notifyByNewIssueEmail: this._user.notifyByNewIssueEmail || false,
          notifyByNewIssuePush: this._user.notifyByNewIssuePush || false,
          notifyByIssueAssignedEmail:
            this._user.notifyByIssueAssignedEmail || false,
          notifyByIssueAssignedPush:
            this._user.notifyByIssueAssignedPush || false,
          notifyByCommentOnIssueEmail:
            this._user.notifyByCommentOnIssueEmail || false,
          notifyByCommentOnIssuePush:
            this._user.notifyByCommentOnIssuePush || false,
          notifyByIssueResolvedEmail:
            this._user.notifyByIssueResolvedEmail || false,
          notifyByIssueResolvedPush:
            this._user.notifyByIssueResolvedPush || false,
          notifyByIssueCloseEmail: this._user.notifyByIssueCloseEmail || false,
          notifyByIssueClosePush: this._user.notifyByIssueClosePush || false
        };

        this.userFacade.editUser(userInfo);
      } else {
        userInfo = {
          ...userInfo,
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
        this.userFacade.addUser(userInfo);
      }
    } else {
      this.router
        .navigate(['/configuration/user-management/users'])
        .then((_) => {
          this.userFacade.resetParams();
        });
    }
  }

  cancel(): void {
    this.dialogModal = true;
    this.dialogType = 'cancel';
    if (this.isEdit) {
      this.dialogSetting.header = 'Edit user';
      this.dialogSetting.hasError = false;
      this.dialogSetting.isWarning = true;
      this.dialogSetting.message =
        'Are you sure that you want to cancel editing user?';
      this.dialogSetting.confirmButton = 'Yes';
      this.dialogSetting.cancelButton = 'Cancel';
      return;
    }

    this.dialogSetting.header = 'Add new user';
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message =
      'Are you sure that you want to cancel adding new user?';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'Cancel';
  }

  submit(): void {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }

    this.dialogModal = true;
    this.dialogType = 'submit';
    if (this.isEdit) {
      this.dialogSetting.header = 'Edit user';
      this.dialogSetting.message =
        'Are you sure you want to submit this changes?';
      this.dialogSetting.isWarning = true;
      this.dialogSetting.confirmButton = 'Yes';
      this.dialogSetting.cancelButton = 'Cancel';
      return;
    } else {
      this.dialogSetting.header = 'Add new user';
      this.dialogSetting.isWarning = true;
      this.dialogSetting.hasError = false;
      this.dialogSetting.message = 'Are you sure you want to add new user?';
      this.dialogSetting.confirmButton = 'OK';
      this.dialogSetting.cancelButton = 'Cancel';
    }
  }

  filterDepartments(event) {
    this.departments = this.departmentsB.filter(
      (x) =>
        (x.id + '').indexOf(event.query) >= 0 ||
        x.name.indexOf(event.query) >= 0
    );
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
    // this.form.controls['portalInformation'].patchValue({
    //   department: this.departmentsB.filter(x => x.id == parseInt($event.organizationId))
    // });
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

  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }

  ngOnDestroy(): void {
    this.formChangesSubscription?.unsubscribe();
    this.departmentSubscription.unsubscribe();
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

  uploadImage($event) {
    if (!$event || !$event.files) {
      return;
    }
    const docId = $event.files[0];
    this.profileDocId = docId;
  }
}

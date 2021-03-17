import { InjectableCompiler } from '@angular/compiler/src/injectable_compiler';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterCardSetting } from '@core/filter';
import { Utility } from '@shared/utility/utility';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
import { Subscription } from 'rxjs';
import { IDialogAlert } from '@core/alret-dialog/alret-dialog.component';
import { DataService } from '../data.service';
@Component({
  selector: 'anms-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent
  extends Utility
  implements OnInit, AfterContentInit, OnDestroy {
  formChangesSubscription!: Subscription;

  dialogSetting: IDialogAlert = {
    header: 'Add new user alert',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };

  dialogModal = false;

  progressBarValue = 50;
  bufferValue = 70;
  public filesUpdloaded: NgxFileDropEntry[] = [];
  form: FormGroup;
  submited = false;
  employees = [
    { name: 'Employee 1', id: 1 },
    { name: 'Employee 2', id: 2 },
    { name: 'Employee 3', id: 3 },
    { name: 'Employee 4', id: 4 },
    { name: 'Employee 5', id: 5 },
    { name: 'Employee 6', id: 6 }
  ];
  departments = [
    { name: 'Department 1', id: 1 },
    { name: 'Department 2', id: 2 },
    { name: 'Department 3', id: 3 },
    { name: 'Department 4', id: 4 },
    { name: 'Department 5', id: 5 },
    { name: 'Department 6', id: 6 }
  ];
  roles = [
    { name: 'Admin', id: 1 },
    { name: 'Manager', id: 2 },
    { name: 'Police', id: 3 },
    { name: 'User', id: 4 }
  ];

  filter: FilterCardSetting[] = [
    {
      isCalendar: true,
      filterTitle: 'statistic.this_month',
      filterCount: '0',
      filterTagColor: '#fff',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.total',
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      filterSupTitle: 'statistic.user',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '08',
      filterTagColor: '#6870B4',
      filterSupTitle: 'statistic.user',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '02',
      filterTagColor: '#BA7967',
      filterSupTitle: 'statistic.user',
      onActive(index: number) {}
    }
  ];

  tempImage: ArrayBuffer | string = '';

  get emails(): FormArray {
    return this.form.get('personalInformation').get('emails') as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.form
      .get('personalInformation')
      .get('phoneNumbers') as FormArray;
  }

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    public dataService: DataService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.buildForm();

    if (this.dataService.isEditing) {
      this.roles.push({
        name: this.dataService.dataToEditFromTable.Role,
        id: 1
      });

      this.form.controls['portalInformation'].patchValue({
        employeeNumber: {
          name: this.dataService.dataToEditFromTable.id,
          id: this.dataService.dataToEditFromTable.id
        },
        department: {
          name: `${this.dataService.dataToEditFromTable.Department.line1} ${this.dataService.dataToEditFromTable.Department.line2}`
        },
        role: { name: this.dataService.dataToEditFromTable.Role, id: 1 },
        activeEmployee: this.dataService.dataToEditFromTable.Status === 'Active'
      });

      this.form.controls['personalInformation'].patchValue({
        firstName: this.dataService.dataToEditFromTable.firstName,
        lastName: this.dataService.dataToEditFromTable.lastName
      });

      this.emails.controls[0].patchValue({
        email: this.dataService.dataToEditFromTable.Information.line1
      });

      this.phoneNumbers.controls[0].patchValue({
        phoneNumber: this.dataService.dataToEditFromTable.Information.line2
      });

      this.form.controls['fileUpload'].patchValue({
        fileName: this.dataService.dataToEditFromTable.picture
      });

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
  }

  ngAfterContentInit(): void {
    this.formChangesSubscription?.unsubscribe();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      portalInformation: this.formBuilder.group({
        employeeNumber: ['', [Validators.required]],
        department: ['', [Validators.required]],
        role: [''],
        activeEmployee: false
      }),
      fileUpload: this.formBuilder.group({
        fileName: 'file.pdf',
        fileSize: '00 MB',
        file: [undefined, [Validators.required]]
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

  createPhoneField(): FormGroup {
    return this.formBuilder.group({
      phoneNumber: ['', [Validators.pattern('^(00|\\+|)[0-9]{10,12}')]]
    });
  }

  addPhoneField(): void {
    if (this.form.get('personalInformation').get('phoneNumbers').invalid) {
      return;
    }
    this.phoneNumbers.push(this.createPhoneField());
  }

  dialogConfirm($event): void {
    console.log($event);
    this.dialogModal = false;

    if ($event && !this.dialogSetting.hasError) {
      this.router.navigate(['/configuration/user-management/users']).then();
    }
  }

  cancel(): void {
    this.dialogModal = true;
    if (this.dataService.isEditing) {
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
    if (this.dataService.isEditing) {
      this.dialogSetting.header = 'Add new user';
      this.dialogSetting.message = 'User edited successfully.';
      this.dialogSetting.confirmButton = 'OK';
      this.dialogSetting.cancelButton = undefined;
      return;
    }

    this.dialogSetting.header = 'Add new user';
    this.dialogSetting.isWarning = false;
    this.dialogSetting.hasError = false;
    this.dialogSetting.message = 'New user added successfully.';
    this.dialogSetting.confirmButton = 'OK';
    this.dialogSetting.cancelButton = undefined;
  }
  filterEmployees(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.employees = [
      { name: 'Employee 1', id: 1 },
      { name: 'Employee 2', id: 2 },
      { name: 'Employee 3', id: 3 },
      { name: 'Employee 4', id: 4 },
      { name: 'Employee 5', id: 5 },
      { name: 'Employee 6', id: 6 }
    ];
  }
  filterDepartments(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.departments = [
      { name: 'Dapartment 1', id: 1 },
      { name: 'Dapartment 2', id: 2 },
      { name: 'Dapartment 3', id: 3 },
      { name: 'Dapartment 4', id: 4 },
      { name: 'Dapartment 5', id: 5 },
      { name: 'Dapartment 6', id: 6 }
    ];
  }
  public dropped(files: NgxFileDropEntry[]) {
    console.log(this.form.value);
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
            console.log(droppedFile.relativePath, file);
          };
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

  ngOnDestroy(): void {
    this.dataService.isEditing = false;
    this.dataService.dataToEditFromTable = undefined;
    this.formChangesSubscription?.unsubscribe();
  }
}

import { InjectableCompiler } from '@angular/compiler/src/injectable_compiler';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class AddUserComponent extends Utility implements OnInit, OnDestroy {
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
        lastName: this.dataService.dataToEditFromTable.lastName,
        email: this.dataService.dataToEditFromTable.Information.line1,
        phoneNumber: this.dataService.dataToEditFromTable.Information.line2
      });

      this.form.controls['fileUpload'].patchValue({
        fileName: this.dataService.dataToEditFromTable.picture
      });
    }

    /*
    Department:
    line1: "Department name"
    line2: "Section Name"
    __proto__: Object
    Information:
    line1: "sample@gmail.com"
    line2: "+97150563793"
    __proto__: Object
    Role: "Fleet Manager"
    Status: "Active"
    firstName: "Sam"
    id: "1234567899"
    lastName: "Smith"
    picture: "user-image.png"
    statusColor: "#7F87CA"
     */

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

  buildForm(): void {
    this.form = this.formBuilder.group({
      portalInformation: this.formBuilder.group({
        employeeNumber: ['', [Validators.required]],
        department: [''],
        role: [''],
        activeEmployee: false
      }),
      fileUpload: this.formBuilder.group({
        fileName: 'file.pdf',
        fileSize: '00 MB'
      }),
      personalInformation: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^(00|\\+|)[0-9]{10,12}')]
        ],
        callCheckbox: false,
        smsCheckbox: false,
        emailCheckbox: false,
        whatsappCheckbox: false
      })
    });
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
    this.dialogSetting.hasError = false;
    this.dialogSetting.message =
      'Are you sure that you want to cancel adding new user?';
    this.dialogSetting.confirmButton = 'Yes';
  }

  submit(): void {
    this.dialogModal = true;
    this.submited = true;
    if (this.form.invalid) {
      this.dialogSetting.hasError = true;
      this.dialogSetting.message = 'Some fields are empty, please fill them.';
      this.dialogSetting.confirmButton = 'OK';
      this.dialogSetting.cancelButton = undefined;
      return;
    }

    if (this.dataService.isEditing) {
      this.dialogSetting.message = 'User edited successfully.';
      this.dialogSetting.confirmButton = 'OK';
      this.dialogSetting.cancelButton = undefined;
      return;
    }

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

  ngOnDestroy(): void {
    this.dataService.isEditing = false;
    this.dataService.dataToEditFromTable = undefined;
    this.formChangesSubscription?.unsubscribe();
  }
}

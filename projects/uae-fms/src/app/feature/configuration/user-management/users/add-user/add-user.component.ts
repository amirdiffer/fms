import { InjectableCompiler } from '@angular/compiler/src/injectable_compiler';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import {
  FormArray,
  FormArray,
  FormArray,
  FormArray,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { FilterCardSetting } from '@core/filter';
import { UsersFacade } from '@feature/configuration/+state/users/users.facade';
import { Utility } from '@shared/utility/utility';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
@Component({
  selector: 'anms-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent extends Utility implements OnInit {
  progressBarValue = 50;
  bufferValue = 70;
  public filesUpdloaded: NgxFileDropEntry[] = [];
  form: FormGroup;
  submitted = false;
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
  emails: FormArray;
  phoneNumbers: FormArray;

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    private facade: UsersFacade
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      employeeNumber: ['', [Validators.required]],
      departmentId: [''],
      roleId: [''],
      isActive: false,
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emails: this.formBuilder.array([this.createEmailForm()]),
      phoneNumbers: this.formBuilder.array([this.createPhoneNumberForm()]),
      notifyByCall: false,
      notifyBySMS: false,
      notifyByEmail: false,
      notifyByWhatsApp: false
    });
  }

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const data = { ...this.form.value };
    data.departmentId = this.form.get('departmentId').value['id'];
    data.employeeNumber = this.form.get('employeeNumber').value['id'];
    data.emails = this.form.get('emails').value.map((e) => e.name);
    data.phoneNumbers = this.form.get('phoneNumbers').value.map((e) => e.name);
    this.facade.addUser(data);
  }

  createEmailForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.email]]
    });
  }
  createPhoneNumberForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  addEmail(): void {
    this.emails = this.form.get('emails') as FormArray;
    this.emails.push(this.createEmailForm());
  }

  addPhoneNumber(): void {
    this.emails = this.form.get('phoneNumbers') as FormArray;
    this.emails.push(this.createPhoneNumberForm());
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
      { name: 'Department 1', id: 1 },
      { name: 'Department 2', id: 2 },
      { name: 'Department 3', id: 3 },
      { name: 'Department 4', id: 4 },
      { name: 'Department 5', id: 5 },
      { name: 'Department 6', id: 6 }
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
  // mapAutoCompleteControl(event, formControlName) {
  //   this.form.get(formControlName).setValue(event.id)
  // }
}

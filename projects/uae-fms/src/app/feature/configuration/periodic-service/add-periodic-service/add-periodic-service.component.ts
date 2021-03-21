import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alret-dialog/alret-dialog.component';
import { ColumnDifinition, ColumnType, TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';
import { PeriodicServiceFacade } from '../../+state/periodic-service';

@Component({
  selector: 'anms-add-periodic-service',
  templateUrl: './add-periodic-service.component.html',
  styleUrls: ['./add-periodic-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPeriodicServiceComponent extends Utility implements OnInit {
  tableColumns: ColumnDifinition[] = [
    {
      lable: 'tables.column.periodic_service_name',
      field: 'periodicServiceName',
      type: ColumnType.lable
    },
    {
      lable:
        '<img src="../../../../../assets/icons/car-solid.svg" class="icon24px">',
      field: 'number',
      isIconLable: true,
      sortable: true,
      width: 100,
      type: ColumnType.lable
    },
    {
      lable: '',
      field: 'floatButton',
      width: 0,
      type: ColumnType.lable,
      thumbField: '',
      renderer: 'floatButton'
    }
  ];

  packages: FormArray;
  tasks: FormArray;

  tableData = [
    {
      periodicServiceName: 'Basic Vehicle Maintenance',
      number: '21'
    },
    {
      periodicServiceName: 'Basic Vehicle Maintenance',
      number: '21'
    },
    {
      periodicServiceName: 'Basic Vehicle Maintenance',
      number: '21'
    }
  ];

  units = [
    { id: 1, name: 'Km/h' },
    { id: 2, name: 'Km/m' },
    { id: 3, name: 'Km/s' }
  ];

  tableSetting = {
    columns: this.tableColumns,
    data: this.tableData,
    rowSettings: {
      floatButton: [
        {
          button: 'edit'
        }
      ]
    }
  };

  addPeriodicServiceForm: FormGroup;
  submitted: boolean = false;
  dialogCancelSetting: IDialogAlert = {
    header: 'Cancel',
    hasError: false,
    isWarning: true,
    message: 'Are you sure you want to cancel?',
    confirmButton: 'Cancel',
    cancelButton: 'No'
  };
  dialogSuccessSetting: IDialogAlert = {
    header: 'Success',
    hasError: false,
    message: 'New ownership Successfully Added'
  };
  dialogErrorSetting: IDialogAlert = {
    header: 'Error',
    hasError: true,
    message: 'Some Error Occurred'
  };
  displayCancelModal = false;
  displaySuccessModal = false;
  displayErrorModal = false;

  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private facade: PeriodicServiceFacade
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.addPeriodicServiceForm = this._fb.group({
      name: ['', [Validators.required]],
      packages: this._fb.array([this.createPackageForm()]),
      tasks: this._fb.array([this.createTaskForm()])
    });
    this.tasks = this.addPeriodicServiceForm.get('tasks') as FormArray;
    if (!this.tasks) this.tasks.push(this.createTaskForm());

    this.packages = this.addPeriodicServiceForm.get('packages') as FormArray;
    if (!this.packages) this.packages.push(this.createPackageForm());
  }

  createTaskForm(): FormGroup {
    return this._fb.group({
      name: ['', [Validators.required]]
    });
  }
  createPackageForm(): FormGroup {
    return this._fb.group({
      packageName: ['', [Validators.required]],
      intervals: ['']
    });
  }
  addTask(): void {
    this.tasks = this.addPeriodicServiceForm.get('tasks') as FormArray;
    this.tasks.push(this.createTaskForm());
  }

  addPackage(): void {
    this.packages = this.addPeriodicServiceForm.get('packages') as FormArray;
    this.packages.push(this.createPackageForm());
  }

  submit() {
    this.submitted = true;
    if (this.addPeriodicServiceForm.invalid) {
      return;
    } else {
      this.displaySuccessModal = true;
      setTimeout(() => {
        this.displaySuccessModal = false;
        this.goToList();
      }, 2000);
    }
  }

  showCancelAlert() {
    this.displayCancelModal = true;
  }

  dialogConfirm(confirmed) {
    if (confirmed) {
      this.displayCancelModal = false;
      this.goToList();
    } else this.displayCancelModal = false;
  }
}

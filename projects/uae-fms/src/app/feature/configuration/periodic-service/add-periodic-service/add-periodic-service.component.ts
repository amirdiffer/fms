import { PeriodicServiceService } from './../../+state/periodic-service/periodic-service.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector,
  ChangeDetectorRef
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { RouterFacade } from '@core/router';
import { ColumnDifinition, ColumnType } from '@core/table';
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
    { id: 'KmPH', name: 'Km/h' },
    { id: 'KmPM', name: 'Km/m' },
    { id: 'KmPS', name: 'Km/s' }
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

  periodicServiceForm: FormGroup;
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
    message: 'New Periodic Service Successfully Added'
  };
  dialogErrorSetting: IDialogAlert = {
    header: 'Error',
    hasError: true,
    message: 'Please fill all required fields',
    confirmButton: 'OK'
  };
  displayCancelModal = false;
  displaySuccessModal = false;
  displayErrorModal = false;
  id: number;
  isEdit: boolean;

  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private periodicServiceFacade: PeriodicServiceFacade,
    private periodicService: PeriodicServiceService,
    private _routerFacade: RouterFacade,
    private changeDetector: ChangeDetectorRef
  ) {
    super(injector);
  }

  getPackageTasks(index: number): FormArray {
    const packageForm = (this.periodicServiceForm.get(
      'packages'
    ) as FormArray).at(index) as FormGroup;
    const tasks = packageForm.controls['tasks'] as FormArray;
    return tasks;
  }

  getTasksForm(packageIndex: number, tasksIndex: number): FormGroup {
    const tasks = this.getPackageTasks(packageIndex);
    if (!tasks) {
      return;
    }
    return tasks.at(tasksIndex) as FormGroup;
  }

  ngOnInit(): void {
    this.periodicServiceForm = this._fb.group({
      name: ['', [Validators.required]],
      packages: this._fb.array([this.createPackageForm()])
    });

    // const initialPackage = ((this.periodicServiceForm.get('packages')) as FormArray).at(0);
    // (initialPackage.get('tasks') as FormArray).push(this.createTaskForm());

    // this.tasks = this.periodicServiceForm.get('packages')[0].controls['tasks'] as FormArray;
    // if (!this.tasks) this.tasks.push(this.createTaskForm());

    this.packages = this.periodicServiceForm.get('packages') as FormArray;
    if (!this.packages) this.packages.push(this.createPackageForm());

    this._routerFacade.route$.subscribe((data: any) => {
      console.log(data);
      this.id = +data.queryParams['id'];

      if (this.id) {
        this.isEdit = true;

        this.periodicService.getById(this.id).subscribe((result) => {
          if (result) {
            this.loadPeriodicServiceForm(result.message);
          }
        });
      }
    });

    this.periodicServiceFacade.submitted$.subscribe((x) => {
      if (x) {
        this.displaySuccessModal = true;
        this.dialogSuccessSetting.header = this.isEdit
          ? 'Edit Periodic Service'
          : 'Add new Periodic Service';
        this.dialogSuccessSetting.message = this.isEdit
          ? 'Changes Saved Successfully'
          : 'Periodic Service Added Successfully';
        this.dialogSuccessSetting.isWarning = false;
        this.dialogSuccessSetting.hasError = false;
        this.dialogSuccessSetting.confirmButton = 'Yes';
        this.dialogSuccessSetting.cancelButton = undefined;
        this.changeDetector.detectChanges();
      }
    });
  }
  loadPeriodicServiceForm(periodicService: any) {
    const { name, numOfUsage, packages } = periodicService;

    this.periodicServiceForm.patchValue({
      name
    });

    this.packages = this.periodicServiceForm.get('packages') as FormArray;
    this.packages.removeAt(0);

    packages.forEach((pack) => {
      this.addPackage(pack.name, pack.intervalValue);
    });

    this.changeDetector.detectChanges();
  }

  createTaskForm(taskName = ''): FormGroup {
    return this._fb.group({
      name: [taskName, [Validators.required]]
    });
  }
  createPackageForm(packageName = '', intervals = ''): FormGroup {
    return this._fb.group({
      packageName: [packageName, [Validators.required]],
      intervals: [intervals],
      intervalType: [''],
      tasks: this._fb.array([this.createTaskForm()])
    });
  }
  addTask(taskName = '', packageIndex = 0): void {
    this.tasks = this.getPackageTasks(packageIndex);
    this.tasks.push(this.createTaskForm(taskName));
  }

  addPackage(packageName = '', intervals = ''): void {
    this.packages = this.periodicServiceForm.get('packages') as FormArray;
    this.packages.push(this.createPackageForm(packageName, intervals));
  }

  submit() {
    if (this.periodicServiceForm.invalid) {
      this.displayErrorModal = true;
    } else {
      if (!this.isEdit) {
        const data = this.getPeriodicServicePayload(
          this.periodicServiceForm.value
        );
        this.periodicServiceFacade.addPeriodicService(data);
      } else {
        this.displaySuccessModal = true;
        setTimeout(() => {
          this.displaySuccessModal = false;
          this.goToList();
        }, 2000);
      }
    }
  }
  getPeriodicServicePayload(periodServiceFormValue: any) {
    const { name, packages } = periodServiceFormValue;

    return {
      name,
      packages: packages.map((p) => {
        return {
          name: p.name,
          intervalType: p.intervalType.id,
          intervalValue: p.intervals,
          tasks: p.tasks.map((t) => t.name)
        };
      })
    };
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

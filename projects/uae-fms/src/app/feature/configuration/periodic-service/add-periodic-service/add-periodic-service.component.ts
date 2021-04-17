import { PeriodicServiceService } from './../../+state/periodic-service/periodic-service.service';
import {
  Component,
  OnInit,
  Injector,
  OnDestroy
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { RouterFacade } from '@core/router';
import { ColumnDifinition, ColumnType } from '@core/table';
import { Utility } from '@shared/utility/utility';
import { PeriodicServiceFacade } from '../../+state/periodic-service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TaskMasterService } from '@feature/workshop/+state/task-master';

@Component({
  selector: 'anms-add-periodic-service',
  templateUrl: './add-periodic-service.component.html',
  styleUrls: ['./add-periodic-service.component.scss']
})
export class AddPeriodicServiceComponent extends Utility implements OnInit , OnDestroy{
  //#region  Table
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

  periodicServices$ = this.periodicServiceFacade.periodicService$.pipe(
    map((x) =>
      x.map((responseObject) => ({
        id: responseObject.id,
        periodicServiceName: responseObject.name,
        number: responseObject.id
      }))
    )
  );

  tableSetting = {
    columns: this.tableColumns,
    data: [],
    rowSettings: {
      floatButton: [
        {
          button: 'edit'
        }
      ]
    }
  };
  //#endregion

  //#region Dialog
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
  //#endregion

  //#region Variables
  id: number;
  isEdit: boolean;
  packages: FormArray;
  tasks: FormArray;

  units = [
    { id: 'KmPH', name: 'Km/h' },
    { id: 'KmPM', name: 'Km/m' },
    { id: 'KmPY', name: 'Km/y' }
  ];

  periodicServiceForm: FormGroup;
  submitted: boolean = false;
  //#endregion

  taskList:any[] =[];
  taskFiltered:any[] =[];
  tasks$:Subscription;
  get task(): FormArray {
    return this.periodicServiceForm.get('tasks') as FormArray;

  }
  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private periodicServiceFacade: PeriodicServiceFacade,
    private periodicService: PeriodicServiceService,
    private _routerFacade: RouterFacade,
    private _taskMasterService: TaskMasterService,
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

  getTasksForm(packageIndex: number, tasksIndex: number): FormArray {
    const packages = this.periodicServiceForm.get('packages');
    return packages['controls'][packageIndex].get('tasks') as FormArray;
  }

  removeTask(i,j){
    console.log(i ,j)
    this.getTasksForm(i,j).removeAt(j)
  }
  ngOnInit(): void {
    // this.periodicServiceFacade.loadAll();
    this.tasks$ = this._taskMasterService.getAllTaks().subscribe(
      (x)=>{
        console.log(x)
        this.taskList = x.message
      }
    )
    this.periodicServiceForm = this._fb.group({
      name: ['', [Validators.required]],
      packageName: [''],
      intervalType: [''],
      intervals: [''],
      packages: this._fb.array([this.createPackageForm()])
    });

    this.periodicServiceForm.controls['intervalType'].setValue({
      id: 'KmPY',
      name: 'Km/y'
    });
    this.packages = this.periodicServiceForm.get('packages') as FormArray;
    if (!this.packages) this.packages.push(this.createPackageForm());

    this._routerFacade.route$.subscribe((data: any) => {
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
      }
    });

    this.periodicServiceFacade.error$.subscribe((x) => {
      if (x) {
        this.displayErrorModal = true;

        this.dialogErrorSetting.message = 'an error occurred during operation';
        this.dialogErrorSetting.hasError = true;
      }
    });
  }
  getAllTask(event) {
    let query = event.query
    let filtered = []
    for (let index = 0; index < this.taskList.length; index++) {
      let task = this.taskList[index];
      console.log(task)
      if (task.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(task)
      }
    }
    this.taskFiltered = filtered
  }
  loadPeriodicServiceForm(periodicService: any) {
    const { name, numOfUsage, packages } = periodicService;

    this.periodicServiceForm.patchValue({
      name
    });

    this.packages = this.periodicServiceForm.get('packages') as FormArray;
    this.packages.removeAt(0);

    packages.forEach((pack) => {
      this.addPackage(pack.name, pack.intervalValue, pack.tasks);
    });

  }

  createTaskForm(taskName = ''): FormGroup {
    return this._fb.group({
      name: [taskName, [Validators.required]]
    });
  }

  createPackageForm(packageName = '', intervals = '', tasks?): FormGroup {
    if (tasks && tasks.length > 0) {
      let forms = [];
      tasks.forEach((element) => {
        forms.push(this.createTaskForm(element.name));
      });
      return this._fb.group({
        packageName: [packageName, [Validators.required]],
        intervals: [intervals],
        intervalType: [''],
        tasks: this._fb.array(forms)
      });
    } else
      return this._fb.group({
        packageName: [packageName, [Validators.required]],
        intervals: [intervals],
        intervalType: [''],
        tasks: this._fb.array([this.createTaskForm()])
      });
  }

  addTask(taskName = '',packageIndex = 0, taskIndex): void {
    if(this.getTasksForm(packageIndex,taskIndex).invalid)return;

    this.tasks = this.getPackageTasks(packageIndex);
    this.tasks.push(this.createTaskForm());
  }

  addPackage(packageName = '', intervals = '', tasks?): void {
    this.packages = this.periodicServiceForm.get('packages') as FormArray;
    this.packages.push(this.createPackageForm(packageName, intervals, tasks));
  }

  submit() {
    this.submitted = true;
    console.log(this.periodicServiceForm.value)
    if (this.periodicServiceForm.invalid) {
      return;
    }

    if (!this.isEdit) {
      const data = this.getPeriodicServicePayload(
        this.periodicServiceForm.value
      );
      this.periodicServiceFacade.addPeriodicService(data);
    } else {
      const data = this.getPeriodicServicePayload(
        this.periodicServiceForm.value
      );
      this.periodicServiceFacade.editPeriodicService({
        ...data,
        id: this.id
      });
    }
  }

  getPeriodicServicePayload(periodServiceFormValue: any) {
    const { name, packages } = periodServiceFormValue;

    return {
      name,
      packages: packages.map((p) => {
        return {
          name: p.packageName,
          intervalType: p.intervalType?.id ? p.intervalType?.id : 'KmPY',
          intervalValue: p.intervals,
          tasks: p.tasks.map((t) => t.name.id)
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

  successDialogConfirm($event) {
    this.goToList();
    this.periodicServiceFacade.reset();
  }
  ngOnDestroy(){
    this.tasks$.unsubscribe()
  }
}

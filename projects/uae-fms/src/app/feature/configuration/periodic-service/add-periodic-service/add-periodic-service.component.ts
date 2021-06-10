import { PeriodicServiceService } from './../../+state/periodic-service/periodic-service.service';
import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
export class AddPeriodicServiceComponent
  extends Utility
  implements OnInit, OnDestroy {
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
    confirmButton: 'Yes',
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
  isEdit: boolean = false;
  packages: FormArray;
  tasks: FormArray;

  units = [
    { id: 'YEAR', name: 'Year' },
    { id: 'MONTH', name: 'Month' },
    { id: 'WEEK', name: 'Week' },
    { id: 'DAY', name: 'Day' },
  ];

  periodicServiceForm: FormGroup;
  submitted: boolean = false;
  //#endregion

  taskList: any[] = [];
  taskListB;
  taskFiltered: any[] = [];
  tasks$: Subscription;
  get package() {
    return this.periodicServiceForm.get('packages') as FormArray;
  }
  get task(): FormArray {
    return this.periodicServiceForm.get('tasks') as FormArray;
  }

  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private periodicServiceFacade: PeriodicServiceFacade,
    private periodicService: PeriodicServiceService,
    private _routerFacade: RouterFacade,
    private _taskMasterService: TaskMasterService
  ) {
    super(injector);
  }

  getPackageTasks(index: number): FormArray {
    const packageForm = (this.periodicServiceForm.get('packages') as FormArray).at(index) as FormGroup;
    const tasks = packageForm.controls['tasks'] as FormArray;
    return tasks;
  }

  getTasksForm(packageIndex: number, tasksIndex: number): FormArray {
    const packages = this.periodicServiceForm.get('packages');
    return packages['controls'][packageIndex].get('tasks') as FormArray;
  }

  removeTask(i, j) {
    this.getTasksForm(i, j).removeAt(j);
  }

  ngOnInit(): void {
    // this.periodicServiceFacade.loadAll();
    this.tasks$ = this._taskMasterService.getAllTaks().subscribe((x) => {
      let data = x.message;
      this.taskListB = data.map((y) => ({ id: y.id, name: y.name }));
    });
    this.periodicServiceForm = this._fb.group({
      name: ['', [Validators.required]],
      packages: this._fb.array([this.createPackageForm()])
    });


    this.packages = this.periodicServiceForm.get('packages') as FormArray;
    if (!this.packages) this.packages.push(this.createPackageForm());

    this._routerFacade.route$.subscribe((data: any) => {
      this.id = data.params['id'];

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

  // getAllTask(event) {
  //   let query = event.query;
  //   let filtered = [];
  //   for (let index = 0; index < this.taskList.length; index++) {
  //     let task = this.taskList[index];
  //     if (task.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
  //       filtered.push(task);
  //     }
  //   }
  //   this.taskFiltered = filtered;
  // }
  filterTasks(event) {
    this.taskList = this.taskListB.filter(
      (x) =>
        (x.id + '').indexOf(event.query) >= 0 ||
        x.name.indexOf(event.query) >= 0
    );
  }

  loadPeriodicServiceForm(periodicService: any) {
    console.log(periodicService)
    this.packages = this.periodicServiceForm.get('packages') as FormArray;
    this.packages.removeAt(0);

    periodicService.packages.forEach((pack) => {
      let tasks = (<Array<object>>pack.tasks).map(x => {
        return {
          id: x['taskMasterId'],
          name: x['taskMasterName']
        }
      });
      this.addPackage(pack.name, pack.intervalValue, tasks);
    });



    this.periodicServiceForm.patchValue({
      name: periodicService.name,
      packages: periodicService.packages.map(x => {
        console.log(x)
        return {
          id: x.id,
          intervals: x.frequency,
          distanceButton: x.milage !== null ? true : false,
          hoursButton: x.hours !== null ? true : false,
          durationButton: x.duration !== null ? true : false,
          milage:x.milage,
          hours:x.hours,
          durationType:x.durationType,
          duration:x.duration,
          milageForReminder:x.milageForReminder,
          hoursForReminder:x.hoursForReminder,
          durationTypeForReminder:x.durationTypeForReminder,
          durationForReminder:x.durationForReminder,
          name: x.name,
          tasks: x.tasks.map(y => {
            return {
              id: y.taskMasterId,
              name:y.taskMasterName
            }
          })
        };
      })
    });
  }


  createTaskForm(taskName = '', id = null): FormControl {
    return this._fb.control(id, [Validators.required])
  }

  createPackageForm(packageName = '', intervals = '', tasks?): FormGroup {
    if (tasks && tasks.length > 0) {
      let forms = [];
      tasks.forEach((element) => {
        forms.push(this.createTaskForm(element.name, element.id));
      });
      return this._fb.group({
        packageName: [packageName, [Validators.required]],
        intervals: [intervals , [Validators.required]],
        distanceButton:[true],
        hoursButton:[false],
        durationButton:[false],
        hasReminder:[{value:true,disabled: true}],
        milage:['',[Validators.required]],
        hours:[''],
        durationType:['YEAR'],
        duration:[''],
        milageForReminder:['' , [Validators.required]],
        hoursForReminder:[''],
        durationTypeForReminder:[''],
        durationForReminder:[''],
        tasks: this._fb.array(forms)
      });
    } else
      return this._fb.group({
        packageName: [packageName, [Validators.required]],
        intervals: [intervals],
        distanceButton:[true],
        hoursButton:[false],
        durationButton:[false],
        hasReminder:[{value:true,disabled: true}],
        milage:['',[Validators.required]],
        hours:[''],
        durationType:['YEAR'],
        duration:[''],
        milageForReminder:['' , [Validators.required]],
        hoursForReminder:[''],
        durationTypeForReminder:[''],
        durationForReminder:[''],
        tasks: this._fb.array([this.createTaskForm()])
      });
  }

  getType(index , formControl){
    return this.package.controls[index].get(formControl).value
  }
  getCheckboxValue(index, value , formControl , inputFormControl ,  inputFormControlReminder){
    const values = [
      this.package.controls[index].get('distanceButton').value,
      this.package.controls[index].get('hoursButton').value,
      this.package.controls[index].get('durationButton').value
    ];
    
    if(!values.includes(true)){
      this.package.controls[index].get(formControl).setValue(true)
      return;
    }
    if(value) {
      this.package.controls[index].get(inputFormControl).setValidators(Validators.required);
      if( this.package.controls[index].get('hasReminder').value){
        this.package.controls[index].get(inputFormControlReminder).setValidators(Validators.required);
      }
    }else{
      this.package.controls[index].get(inputFormControl).clearValidators();
      this.package.controls[index].get(inputFormControlReminder).clearValidators();

    }
  }

  changeReminder(index , event){
    const values = [
      this.package.controls[index].get('distanceButton').value,
      this.package.controls[index].get('hoursButton').value,
      this.package.controls[index].get('durationButton').value
    ];
    if(event.checked){
      values.map( (x , i) =>{
        
        if(x && i==0){
          console.log(x,i)
          this.package.controls[index].get('milageForReminder').setValidators(Validators.required);
        }else if( i ==0 ){
          this.package.controls[index].get('milageForReminder').clearValidators();
        }
        if(x && i==1){
          this.package.controls[index].get('hoursForReminder').setValidators(Validators.required);
        }else if( i ==1 ){
          this.package.controls[index].get('hoursForReminder').clearValidators();
        }
        if(x && i==2){
          this.package.controls[index].get('durationForReminder').setValidators(Validators.required);
        }else if( i ==2 ){
          this.package.controls[index].get('durationForReminder').clearValidators();
        }
      })
      console.log(values)
    }else{
      this.package.controls[index].get('milageForReminder').clearValidators();
      this.package.controls[index].get('hoursForReminder').clearValidators();
      this.package.controls[index].get('durationForReminder').clearValidators()
    }
  }
  addTask(taskName = '', packageIndex = 0, taskIndex): void {
    if (this.getTasksForm(packageIndex, taskIndex).invalid) return;

    this.tasks = this.getPackageTasks(packageIndex);
    this.tasks.push(this.createTaskForm());
  }

  addPackage(packageName = '', intervals = '', tasks?): void {
    this.packages = this.periodicServiceForm.get('packages') as FormArray;
    this.packages.push(this.createPackageForm(packageName, intervals, tasks));
  }

  removePackage(index){
    this.package.removeAt(index)
  }

  submit() {
    this.submitted = true;
    if (this.periodicServiceForm.invalid) {
      return;
    }
    const data = this.getPeriodicServicePayload(
      this.periodicServiceForm.value
    );
    console.log(this.periodicServiceFacade.addPeriodicService(data))
    if (!this.isEdit) {
      this.periodicServiceFacade.addPeriodicService(data);
    } else {
      this.periodicServiceFacade.editPeriodicService({...data,id: this.id});
    }
  }

  getPeriodicServicePayload(periodServiceFormValue: any) {
    const { name, packages } = periodServiceFormValue;
    return {
      name,
      packages: packages.map((p) => {
        return {
          name: p.packageName,
          frequency: p.intervals,
          milage:p.distanceButton ? p.milage : null,
          hours:p.hoursButton ? p.hours : null,
          durationType: p.durationButton ? p.durationType : null,
          duration:p.durationButton ? p.duration :null,
          milageForReminder:p.distanceButton ? p.milageForReminder : null,
          hoursForReminder:p.hoursButton ? p.hoursForReminder : null,
          durationTypeForReminder:p.durationButton ? p.durationTypeForReminder : null,
          durationForReminder:p.distanceButton ? p.durationForReminder : null,
          tasks: p.tasks.map((t) => t.id)
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
      this._goToList();
    } else this.displayCancelModal = false;
  }

  successDialogConfirm($event) {
    this._goToList();
    this.periodicServiceFacade.reset();
  }
  ngOnDestroy() {
    this.tasks$.unsubscribe();
  }

  _goToList() {
    this.router.navigate(['configuration/periodic-service']);
  }
}

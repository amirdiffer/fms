import { TaskMasterFacade } from '../../+state/task-master/task-master.facade';
import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Utility } from '@shared/utility/utility';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TaskMasterService } from '@feature/workshop/+state/task-master';
import { DialogService } from '@core/dialog/dialog-template.component';

@Component({
  selector: 'anms-task-master-form',
  templateUrl: './task-master-form.component.html',
  styleUrls: ['./task-master-form.component.scss']
})
export class TaskMasterFormComponent
  extends Utility
  implements OnInit, OnDestroy {
  searchIcon = 'assets/icons/search.svg';
  checked = true;
  taskMasterForm: FormGroup;
  submitted = false;
  addSkillValidation = false;
  addPartValidation = false;
  skillList: any[] = [];
  skillFiltered: any[] = [];
  skills$: Subscription;
  isEdit = false;
  recordId: number;

  get skills(): FormArray {
    return this.taskMasterForm.get('skills') as FormArray;
  }
  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private _facade: TaskMasterFacade,
    private taskMasterService: TaskMasterService,
    private _dialogService : DialogService
  ) {
    super(injector);
    this._facade.reset();
  }

  ngOnInit(): void {
    this._facade.loadAllSkill();
    this.taskMasterForm = this._fb.group({
      taskName: ['', [Validators.required]],
      shopType: ['BODYSHOP', [Validators.required]],
      taskType: ['NORMAL', [Validators.required]],
      instruction: ['', [Validators.required]],
      ratePerHour: [''],
      timeEstimate: ['', [Validators.required]],
      skills: this._fb.array([this.createSkill()]),
      needPart: [false],
      part: this._fb.array([this._fb.control(null)])
    });
    this.taskMasterForm.get('shopType').valueChanges.subscribe((x) => {
      if (x === 'SERVICESHOP') {
        this.taskMasterForm.get('taskType').patchValue('ELECTRICAL_SERVICE');
      } else {
        this.taskMasterForm.get('taskType').patchValue('NORMAL');
      }
    });
    this.route.url.subscribe((params) => {
      this.isEdit =
        params.filter((x) => x.path === 'edit-task-master').length > 0;
      if (this.isEdit) {
        this.recordId = +params[params.length - 1].path;
        this.taskMasterService
          .getTaskMaster(this.recordId)
          .pipe(map((y) => y.message))
          .subscribe((z: any) => {
            if (z) {
              this.taskMasterForm.patchValue({
                shopType: z.shopType,
                taskType: z.taskType,
                taskName: z.name,
                instruction: z.instruction,
                ratePerHour: z.ratePerHour,
                timeEstimate: z.timeEstimate,
                needPart: z.doesNeedParty
              });

              if (z.skills) {
                this.skillList = z.skills;
                for (let i = 0; i < z.skills.length; i++) {
                  this.addSkill();
                  this.skills.controls[i].patchValue({
                    skill: this.skillList[i]
                  });
                }
              }
            }
          });
      }
    });
    this.handleSubmissionDialog();
    this.handleErrorDialog();
  }
  submit() {
    this.submitted = true;
    if (
      this.skills.length > 1 &&
      this.skills.controls[this.skills.length - 1].value == null
    ) {
      this.removeSkill(this.skills.length - 1);
    }
    if (this.taskMasterForm.invalid) {
      return;
    } else {
      const data = this.getTaskMasterPayload(this.taskMasterForm.value);

      if (!this.isEdit) {
        this._facade.addTaskMaster(data);
      } else {
        data['id'] = this.recordId;
        const dialog = this._dialogService.show('warning' , 'Edit task' , 'Are you sure you want to edit task?' , 'Yes','Cancel')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
            this._facade.editTaskMaster(data);
          }
          dialogClose$?.unsubscribe();
          })
        ).subscribe();
        
      }
    }
  }

  handleSubmissionDialog() {
    this._facade.submitted$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('success' , 
        (this.isEdit ? 'Edit Task ': 'Add New Task' ), 
        (this.isEdit ? 'Changes Saved Successfully' : 'Task Added Successfully'),'Ok')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
            this.router.navigate(['/workshop/task-master']).then(()=>{
              this._facade.loadAll();
            });
          }
          dialogClose$?.unsubscribe();
          })
        ).subscribe()
      }
    });
  }

  handleErrorDialog() {
    this._facade.error$.subscribe((x) => {
      if (x?.error) {
        const dialog = this._dialogService.show('danger' , 
        (this.isEdit ? 'Edit Task': 'Add New Task' ), 
        'We Have Some Error','Ok')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
          }
          dialogClose$?.unsubscribe();
          })
        ).subscribe()
      }
    });
  }

  getAllSkill(event) {
    let query = event.query;
    let filtered = [];
    for (let index = 0; index < this.skillList.length; index++) {
      let skill = this.skillList[index];
      if (skill.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(skill);
      }
    }
    this.skillFiltered = filtered;
  }

  skillSelect(event) {}

  getTaskMasterPayload(value: any) {
    const {
      instruction,
      ratePerHour,
      skills,
      taskName,
      timeEstimate,
      needPart,
      shopType,
      taskType
    } = value;

    const taskMaster = {
      shopType: shopType,
      taskType: taskType,
      name: taskName,
      instruction: instruction,
      timeEstimate: timeEstimate,
      ratePerHour: ratePerHour,
      skills: skills.map((s) => {
        if (!s.skill.id) {
          return { name: s.skill };
        }
        return { name: s.skill.name, id: s.skill.id };
      }),
      doesNeedParty: needPart
    };
    return taskMaster;
  }
  cancel() {
    const dialog = this._dialogService.show('warning' , 'Are you sure you want to leave?' , 'You have unsaved changes! If you leave, your changes will be lost.' , 'Yes','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
    .pipe(
      tap((result) => {
      if (result === 'confirm') {
        this.router.navigate(['/workshop/task-master']);
      }
      dialogClose$?.unsubscribe();
      })
    ).subscribe();
  }

  createSkill(): FormGroup {
    return this._fb.group({
      skill: ['', Validators.required]
    });
  }

  addSkill() {
    if (this.skills.invalid) {
      return;
    }
    this.skills.push(this.createSkill());
  }
  removeSkill(i) {
    this.skills.removeAt(i);
  }
  addPart(value) {
    if (value !== '' && value != null) {
      this.addPartValidation = false;
      const part = new FormControl(null);
      (<FormArray>this.taskMasterForm.get('part')).push(part);
    } else {
      this.addPartValidation = true;
    }
  }

  ngOnDestroy(): void {
    this.skills$?.unsubscribe();
  }
}

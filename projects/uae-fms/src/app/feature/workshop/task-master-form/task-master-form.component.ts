import { TaskMasterFacade } from './../+state/task-master/task-master.facade';
import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Utility } from '@shared/utility/utility';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskMasterService } from '@feature/workshop/+state/task-master';

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
  dialogModal = false;
  dialogModalCancel = false;
  dialogModalError = false;
  skillList: any[] = [];
  skillFiltered: any[] = [];
  skills$: Subscription;
  dialogSetting: IDialogAlert = {
    header: 'Task Master',
    hasError: false,
    hasHeader: true,
    message: 'New Task Master added Successfully Added',
    confirmButton: 'OK'
  };
  dialogSettingCancel: IDialogAlert = {
    header: 'Task Master',
    hasError: false,
    isWarning: true,
    hasHeader: true,
    message: 'Are you sure that you want to cancel the task master creation?',
    confirmButton: 'Yes',
    cancelButton: 'No'
  };

  dialogSettingError: IDialogAlert = {
    header: 'Task Master',
    message: 'Error occurred in progress',
    confirmButton: 'Ok',
    isWarning: false,
    hasError: true,
    hasHeader: true,
    cancelButton: undefined
  };

  isEdit = false;
  recordId: number;
  dialogType: string;

  get skills(): FormArray {
    return this.taskMasterForm.get('skills') as FormArray;
  }
  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private _facade: TaskMasterFacade,
    private taskMasterService: TaskMasterService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._facade.loadAllSkill();
    this.taskMasterForm = this._fb.group({
      taskName: ['', [Validators.required]],
      instruction: ['', [Validators.required]],
      ratePerHour: [''],
      timeEstimate: ['', [Validators.required]],
      skills: this._fb.array([this.createSkill()]),
      needPart: [false],
      part: this._fb.array([this._fb.control(null)])
    });

    this.route.url.subscribe((params) => {
      this.isEdit = params.filter((x) => x.path === 'edit-task-master').length > 0;
      if (this.isEdit) {
        this.recordId = +params[params.length - 1].path
        this.taskMasterService.getTaskMaster(this.recordId)
          .pipe(map((y) => y.message))
          .subscribe((z) => {
            if (z) {
              this.taskMasterForm.patchValue({
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
          })
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
        this._facade.editTaskMaster(data);
      }
    }
  }

  handleSubmissionDialog() {
    this._facade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogType = 'success';
        this.dialogSetting.header = this.isEdit
          ? 'Edit Sub Asset'
          : 'Add new Sub Asset';
        this.dialogSetting.message = this.isEdit
          ? 'Changes Saved Successfully'
          : 'Sub Asset Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
      }
    });
  }

  handleErrorDialog() {
    this._facade.error$.subscribe((x) => {
      if (x?.error) {
        this.dialogModalError = true;
        this.dialogSettingError.header = this.isEdit
          ? 'Edit Sub Asset'
          : 'Add new Sub Asset';
        this.dialogSettingError.hasError = true;
        this.dialogSettingError.cancelButton = undefined;
        this.dialogSettingError.confirmButton = 'Ok';
      } else {
        this.dialogModalError = false;
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
  skillSelect(event) {
    console.log(event);
  }
  getTaskMasterPayload(value: any) {
    const {
      instruction,
      ratePerHour,
      skills,
      taskName,
      timeEstimate,
      needPart
    } = value;

    const taskMaster = {
      shopType: 'BODYSHOP',
      taskType: 'NORMAL',
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
    this.dialogModalCancel = true;
  }
  dialogCancelConfirm(value) {
    if (value === true) {
      this.router.navigate(['/workshop/task-master/']).then(_ => this._facade.reset())
    }
    this.dialogModalCancel = false;
  }
  dialogConfirm(value) {
    this._facade.reset();
    this.router.navigate(['/workshop/task-master/']).then(_ => this._facade.reset())
    return;
  }

  createSkill(): FormGroup {
    return this._fb.group({
      skill: ['', Validators.required]
    })
  }

  addSkill() {
    if (this.skills.invalid) {
      return;
    }
    this.skills.push(this.createSkill())
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

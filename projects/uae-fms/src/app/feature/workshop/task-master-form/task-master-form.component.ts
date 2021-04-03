import { TaskMasterFacade } from './../+state/task-master/task-master.facade';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector,
  ChangeDetectorRef
} from '@angular/core';
import { TaskMasterService } from '../task-master/task-master.service';
import { Utility } from '@shared/utility/utility';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';

@Component({
  selector: 'anms-task-master-form',
  templateUrl: './task-master-form.component.html',
  styleUrls: ['./task-master-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskMasterFormComponent extends Utility implements OnInit {
  searchIcon = 'assets/icons/search.svg';
  checked = true;
  taskMasterForm: FormGroup;
  submitted = false;
  addSkillValidation = false;
  addPartValidation = false;
  dialogModal = false;
  dialogModalCancel = false;
  dialogModalError = false;
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
  constructor(
    private _taskMasterService: TaskMasterService,
    injector: Injector,
    private _fb: FormBuilder,
    private _facade: TaskMasterFacade,
    private changeDetector: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.taskMasterForm = this._fb.group({
      taskName: ['', [Validators.required]],
      instruction: ['', [Validators.required]],
      ratePerHour: [''],
      timeEstimate: ['', [Validators.required]],
      skill: this._fb.array([this._fb.control(null)]),
      needPart: [false],
      part: this._fb.array([this._fb.control(null)])
    });

    this.handleSubmissionDialog();
    this.handleErrorDialog();
  }
  submit() {
    this.submitted = true;
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
        this.changeDetector.detectChanges();
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
        this.changeDetector.detectChanges();
      } else {
        this.dialogModalError = false;
      }
    });
  }

  getTaskMasterPayload(value: any) {
    const {
      instruction,
      ratePerHour,
      skill,
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
      skills: skill.map((s) => ({ name: s })),
      doesNeedParty: needPart
    };
    return taskMaster;
  }
  cancel() {
    this.dialogModalCancel = true;
  }
  dialogCancelConfirm(value) {
    if (value === true) {
      this.goToList();
    }
    this.dialogModalCancel = false;
  }
  dialogConfirm(value) {
    this._facade.reset();
    this.goToList();
    return;
  }
  addSkill(value) {
    if (value !== '' && value != null) {
      this.addSkillValidation = false;
      const skill = new FormControl(null);
      (<FormArray>this.taskMasterForm.get('skill')).push(skill);
    } else {
      this.addSkillValidation = true;
    }
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
}

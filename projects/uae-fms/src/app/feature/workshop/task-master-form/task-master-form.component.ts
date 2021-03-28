import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
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
import { IDialogAlert } from '@core/alret-dialog/alret-dialog.component';

@Component({
  selector: 'anms-task-master-form',
  templateUrl: './task-master-form.component.html',
  styleUrls: ['./task-master-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskMasterFormComponent extends Utility implements OnInit {
  searchIcon = 'assets/icons/search.svg';
  checked = true;
  tableSetting;
  inputForm: FormGroup;
  submited = false;
  addSkillValidation = false;
  addPartValidation = false;
  dialogModalAdd= false;
  dialogModalCancel= false;
  dialogSettingAdd : IDialogAlert ={
    header:'Asset Policy',
    hasError:false,
    hasHeader:true,
    message:'New Asset Policy Successfully Added',
    confirmButton: 'OK',
  }
  dialogSettingCancel : IDialogAlert ={
    header:'Add Task Master',
    hasError:false,
    isWarning:true,
    hasHeader:true,
    message:'Are you sure that you want to cancel the task master creation?',
    confirmButton: 'Yes',
    cancelButton:'No',
  }
  constructor(
    private _taskMasterService: TaskMasterService,
    injector: Injector,
    private _fb: FormBuilder
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      taskName: ['', [Validators.required]],
      instruction: ['', [Validators.required]],
      ratePerHour: [''],
      timeEstimate: ['', [Validators.required]],
      skill: this._fb.array([this._fb.control(null)]),
      needPart: [false],
      part: this._fb.array([this._fb.control(null)])
    });
    this.tableSetting = this._taskMasterService.tableSetting;
  }
  addRequest() {
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    }else{
      this.dialogModalAdd = true
    }
    // this.goToList();
  }
  cancel(){
    this.dialogModalCancel = true;
  }
  dialogCancelConfirm(value){
    if(value === true){
      this.goToList();
    }
    this.dialogModalCancel = false
  }
  dialogAddConfirm(value){
    if(value === true){
      this.goToList();
    }
    this.dialogModalAdd = false;
  }
  addSkill(value) {
    if(value != "" && value != null){
      this.addSkillValidation = false;
      const skill = new FormControl(null);
      (<FormArray>this.inputForm.get('skill')).push(skill);
    }else{
      this.addSkillValidation = true;
    }
  }
  addPart(value) {
    if(value != "" && value != null){
      this.addPartValidation = false;
      const part = new FormControl(null);
      (<FormArray>this.inputForm.get('part')).push(part);
    }else{
      this.addPartValidation = true;
    }
  }

}

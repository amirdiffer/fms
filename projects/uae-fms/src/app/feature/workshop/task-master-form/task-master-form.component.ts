import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { TaskMasterService } from '../task-master/task-master.service';
import { Utility } from '@shared/utility/utility';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  submited=false;
  constructor(private _taskMasterService: TaskMasterService , injector: Injector, private _fb:FormBuilder) {super(injector);}

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      taskName:['',[Validators.required]],
      instruction:['',[Validators.required]],
      ratePerHour:['',[Validators.required]],
      timeEstimate:['',[Validators.required]],
      skill: this._fb.array([
        this._fb.control('', [Validators.required])
      ]),
      needPart:[true],
      part:this._fb.array([
        this._fb.control('', [Validators.required])
      ])
    })
    this.tableSetting = this._taskMasterService.tableSetting;
  }
  addRequest(){
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    }
    this.goToList();
  }
  addSkill(){
    const skill = new FormControl(null , [Validators.required]);
    (<FormArray>this.inputForm.get('skill')).push(skill);
  }
  addPart(){
    const part = new FormControl(null , [Validators.required]);
    (<FormArray>this.inputForm.get('part')).push(part);
  }
}

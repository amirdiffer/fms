import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskMasterService } from '../task-master/task-master.service';

@Component({
  selector: 'anms-task-master-form',
  templateUrl: './task-master-form.component.html',
  styleUrls: ['./task-master-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskMasterFormComponent implements OnInit {
  searchIcon = 'assets/icons/search.svg';
  checked = true;
  tableSetting;
  constructor(private _taskMasterService: TaskMasterService) {}

  ngOnInit(): void {
    this.tableSetting = this._taskMasterService.tableSetting;
  }
}

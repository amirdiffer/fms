import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskMasterService } from './task-master.service';

@Component({
  selector: 'anms-task-master',
  templateUrl: './task-master.component.html',
  styleUrls: ['./task-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskMasterComponent implements OnInit {
  searchIcon = 'assets/icons/search.svg';
  tableSetting;
  constructor(private _taskMasterService: TaskMasterService) {}

  ngOnInit(): void {
    this.tableSetting = this._taskMasterService.tableSetting;
  }
}

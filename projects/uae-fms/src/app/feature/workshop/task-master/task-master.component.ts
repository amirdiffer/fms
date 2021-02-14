import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskMasterFacade } from '../+state/task-master';
import { TaskMasterService } from './task-master.service';

@Component({
  selector: 'anms-task-master',
  templateUrl: './task-master.component.html',
  styleUrls: ['./task-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskMasterComponent implements OnInit {
  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn= 'assets/icons/download-solid.svg';
  tableSetting;
  constructor(
    private _taskMasterService: TaskMasterService,
    private _facade: TaskMasterFacade
  ) {}

  ngOnInit(): void {
    this.tableSetting = this._taskMasterService.tableSetting;
    this._facade.loadAll();
  }
}

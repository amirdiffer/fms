import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
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
  downloadBtn = 'assets/icons/download-solid.svg';
  tableSetting;

  /*
  doesNeedParty: false
  id: 3
  instruction: "something3"
  name: "something33"
  ratePerHour: 20
  shopType: "BODYSHOP"
  skills: [{id: 3, name: "fixing"}]
  taskType: "NORMAL"
  timeEstimate: 1234
  */
  data$ = this._facade.taskMasters$.pipe(
    map((x) => {
      return x.map((y: any) => {
        debugger;
        const skills = y.skills;
        const skill =
          skills && skills instanceof Array && skills.length ? skills[0] : '';
        const row = {
          ...y,
          skill: skill ? skill.name : '',
          part: y.shopType,
          taskName: y.name
        };

        return row;
      });
    })
  );

  constructor(
    private _taskMasterService: TaskMasterService,
    private _facade: TaskMasterFacade
  ) {}

  ngOnInit(): void {
    this.tableSetting = this._taskMasterService.tableSetting;
    this._facade.loadAll();

    this._facade.taskMasters$.subscribe((x) => {
      console.log(x);
    });
  }
}

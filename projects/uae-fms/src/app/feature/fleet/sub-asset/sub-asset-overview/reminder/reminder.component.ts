import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anms-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
@Input() title:string;
@Input() data:IReminders[];
  constructor() { }

  ngOnInit(): void {
  }

}

export interface IReminders{
  title:string;
  date:string;
  time:string;
  type:IRemindersType
}
export enum IRemindersType{
  normal='normal',
  urgent='urgent',
  over='over'
}

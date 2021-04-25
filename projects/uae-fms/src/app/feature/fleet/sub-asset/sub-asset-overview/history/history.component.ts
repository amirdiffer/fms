import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anms-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
@Input() title:string;
@Input() data:IHistory[];
  constructor() { }

  ngOnInit(): void {
  }

}

export interface IHistory{
  title:string;
  date:string;
  time:string;
  assign:string;
  type:IHistoryType
}
export enum IHistoryType{
  done='done',
  toDo='toDo',
  doing='doing'
}

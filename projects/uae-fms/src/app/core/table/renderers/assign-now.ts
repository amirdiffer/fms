import { Component, Input, OnInit } from '@angular/core';
import { TollFacade } from '@feature/toll/+state';

@Component({
  selector: 'table-assign-now-renderer',
  template: `
    <div *ngIf="status == 'Assigned'; else assignNow">
      <div class="">{{ this.objectData[1] }}</div>
      <small> {{ this.objectData[0] }} </small>
    </div>
    <ng-template #assignNow>
      <div class="assign-now">
        <span (click)="assign(row)">Assign Now</span>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .assign-now span {
        text-decoration: underline;
        cursor: pointer;
      }
    `
  ]
})
export class AssignNow implements OnInit {
  @Input('data') data;
  @Input('status') status;
  @Input('row') row;

  constructor(private _facade: TollFacade) {}

  objectData = {};

  ngOnInit(): void {
    this.objectData = Object.values(this.data);
  }

  assign(data: object) {
    this._facade.loadAssignNow(data);
  }
}

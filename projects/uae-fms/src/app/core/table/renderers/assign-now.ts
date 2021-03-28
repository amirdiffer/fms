import { Component, Input, OnInit } from '@angular/core';
import { TollFacade } from '@feature/toll/+state';

@Component({
  selector: 'table-assign-now-renderer',
  template: `
    <div *ngIf="data.status == 'Assigned' else assignNow">
      <div class="">{{ data.assets.assetName }}</div>
      <small> {{ data.assets.subAsset }} </small>
    </div>
    <ng-template #assignNow>
      <div class="assign-now">
        <span (click)="assign(data)">Assign Now</span>
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

  constructor(private _facade: TollFacade) {}

  ngOnInit(): void {
  }

  assign(data: object) {
    this._facade.loadAssignNow(data);
  }

}

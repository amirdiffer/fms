import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-user-renderer',
  template: `
    <div class="d-flex">
      <div>
        <img class="user-image" [src]="fileServerBase + (user.picture?user.picture:'man-in-suit2.png')" />
      </div>
      <div class="d-flex flex-column">
        <span class="user-name">{{
          user.firstName + ' ' + user.lastName
        }}</span>
        <span class="user-info">{{ user.id }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      div .user-image {
        height: 4.3em;
        max-width: 4.3em;
        border-radius: 0.5em;
      }

      div .user-name {
        margin-left: 10px;
        text-align: left;
      }

      div .user-info {
        margin-left: 10px;
        text-align: left;
      }
    `
  ]
})
export class TableUserRendererComponent implements OnInit {
  @Input() user;
  fileServerBase = environment.baseFileServer;

  constructor() { }

  ngOnInit() {
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-user-renderer',
  template: `
    <div class="d-flex">
      <div>
        <img class="user-image" [src]="fileServerBase + user.profilePicture" />
      </div>
      <div class="d-flex flex-column">
        <span class="user-name">{{
          user.firstName + ' ' + user.lastName
        }}</span>
        <span class="user-info">{{ user.userInfo }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      div .user-image {
        max-width: 60px;
        max-height: 50px;
        border-radius: 4px;
      }

      div .user-name {
        margin-left: 10px;
        text-align: left;
        font-size: 17px;
        color: #000000de;
      }

      div .user-info {
        margin-left: 10px;
        text-align: left;
        font-size: 17px;
        color: #000000de;
      }
    `
  ]
})
export class TableUserRendererComponent implements OnInit {
  @Input() user;
  fileServerBase = environment.baseFileServer;

  constructor() {}

  ngOnInit() {}
}

import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-user-renderer',
  template: `
    <div>
      <img class="user-image" [src]="fileServerBase + user.profilePicture" />
      <span class="user-name">{{ user.firstName + ' ' + user.lastName }}</span>
    </div>
  `,
  styles: [
    `
      div .user-image {
        max-width: 40px;
        max-height: 40px;
        border-radius: 4px;
      }

      div .user-name {
        margin: 5px;
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

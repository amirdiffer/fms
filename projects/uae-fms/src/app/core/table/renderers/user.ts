import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-user-renderer',
  template: `
    <div class="d-flex">
      <div>
        <img
          class="user-image"
          [src]="
            isImageLoaded
              ? fileServerBase + (user.profileDocId ? user.profileDocId : '1')
              : defaultImage
          "
          (error)="onError($event)"
          [class.default-image-size]="defaultImage.length"
        />
      </div>
      <div class="d-flex flex-column">
        <span class="user-name">{{
          user.technician
            ? user.technician.firstName + ' ' + user.technician.lastName
            : user.firstName + ' ' + user.lastName
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

      div .default-image-size {
        width: 4.3em;
        height: 4.3em;
      }
    `
  ]
})
export class TableUserRendererComponent implements OnInit {
  @Input() user;
  defaultImage = '';
  isImageLoaded = true;
  fileServerBase = environment.baseFileServer;

  constructor() {}

  ngOnInit() {}

  onError($event): void {
    if ($event.type === 'error') {
      this.isImageLoaded = false;
      this.defaultImage = 'assets/user.svg';
    }
  }
}

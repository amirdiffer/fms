import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'table-action-button-renderer',
  template: ` <fa-icon class="icon24px" [icon]="faEllipsisV"></fa-icon> `,
  styles: [``]
})
export class TableActionButtonRendererComponent implements OnInit {
  faEllipsisV = faEllipsisV;

  constructor() {}

  ngOnInit() {}
}

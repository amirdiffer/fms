import { Component, Input, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'table-add-button-renderer',
  template: ` <fa-icon class="icon24px" [icon]="faPlus"></fa-icon> `,
  styles: [``]
})
export class TableAddButtonRendererComponent implements OnInit {
  faPlus = faPlus;

  constructor() {}

  ngOnInit() {}
}

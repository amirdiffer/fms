import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-action-button-renderer',
  template: ` <img src="../../../assets/icons/three-dots.svg" /> `,
  styles: [
    `
      img {
        height: 1.3em;
      }
    `
  ]
})
export class TableActionButtonRendererComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table-add-button-renderer',
  template: ` <span class="plus-icon">+</span> `,
  styles: [
    `
      .plus-icon {
        font-weight: 800;
        font-size: 1.7em;
        height: fit-content;
      }
    `
  ]
})
export class TableAddButtonRendererComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

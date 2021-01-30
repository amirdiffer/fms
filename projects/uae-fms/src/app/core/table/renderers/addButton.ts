import { Component, Input, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'table-add-button-renderer',
  template: ` <span class="plus-icon">+</span> `,
  styles: [`
    .plus-icon{
      font-weight: 800;
      font-size: 1.7rem;
      height: fit-content;
    }
  `]
})
export class TableAddButtonRendererComponent implements OnInit {
  faPlus = faPlus;

  constructor() {}

  ngOnInit() {}
}
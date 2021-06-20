import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'table-dropdown-renderer',
  template: `
    <div class="d-flex align-items-center justify-content-end">
      <div
        class="curved_right_tag text-center"
        [ngStyle]="{
          'background-color': rowIndexTable == index ? '#1f8302' : null
        }"
        (click)="changeTRSelected()"
      >
        <svg-icon
          src="assets/icons/up.svg"
          [svgStyle]="{
            'width.px': '16',
            fill: '#fff',
            height: '16',
            'stroke-width': '40px',
            stroke: 'white',
            transform:
              rowIndexTable == index ? 'rotate(0deg)' : 'rotate(180deg)'
          }"
        ></svg-icon>
      </div>
    </div>
  `,
  styles: [
    `
      .curved_right_tag {
        min-width: 20px;
        background: #475f7b58 0 0 no-repeat padding-box;
        border-radius: 100px 0 0 100px;
        opacity: 1;
        padding: 1em 1em;
        cursor: pointer;
        margin-inline-end: -1rem;
      }
    `
  ]
})
export class DropdownRenderer implements OnInit {
  @Input() data;
  @Input() index;
  @Input() rowIndexTable;
  @Output() selected: EventEmitter<object> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  changeTRSelected() {
    this.selected.emit({ id: this.data['id'], index: this.index });
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'table-toggle-renderer',
  template: `
    <div class="toggle-select">
      <p-inputSwitch (onChange)="clicked(setting, field, data)" [(ngModel)]="value"></p-inputSwitch>
    </div>
  `,
  styleUrls: ['./checkbox-renderer.scss']
})
export class ToggleRenderer implements OnInit {
  @Input() data;
  @Input() field;
  @Input() setting;
  value: boolean;

  constructor() {}

  ngOnInit() {
   this.value  = this.data[this.field];
  }

  clicked(item, col, data) {
    if (item && item.onClick && item.onClick instanceof Function) {
      this.setting?.onClick(col, data, 'toggle', this.value)
    }
  }

}

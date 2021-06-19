import { Component, Input, OnInit } from '@angular/core';
import { ColumnDifinition, RowSettings } from '@core/table/table.component';

@Component({
  selector: 'anms-table-plus-minus-renderer',
  template: `
    <div (click)='onClick()'>
      <img [src]='!isSelected ? "assets/icons/table-plus.png" : "assets/icons/table-minus.png"' alt=''/>
    </div>
  `
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class PlusMinusRenderer implements OnInit {

  @Input() rowIndex: number;
  @Input() setting: RowSettings;

  isSelected = false;

  ngOnInit(): void {
  }

  onClick(): void {
    this.isSelected = !this.isSelected;
    this.setting.onClick(this.isSelected, this.rowIndex);
  }
}

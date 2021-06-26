import { Component, Input, OnInit } from '@angular/core';
import { ColumnDifinition, TableSetting } from '@core/table';

@Component({
  selector: 'anms-foldable-row-renderer',
  template: `
    <div *ngIf="!setting.rows[rowIndex].foldableRowOption.isFolded">
      <div
        *ngFor="let item of data"
        [class.transparent]="!column?.hasExpandedInfo"
        class="text"
      >
        <p>{{ item }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .text {
        margin-top: 20px;
      }

      .transparent {
        color: transparent;
      }
    `
  ]
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class FoldableRowRenderer implements OnInit {
  @Input() rowIndex: number | undefined;
  @Input() setting: TableSetting | undefined;
  @Input() data: any[] | undefined;
  @Input() column: ColumnDifinition | undefined;

  constructor() {}

  ngOnInit(): void {}
}

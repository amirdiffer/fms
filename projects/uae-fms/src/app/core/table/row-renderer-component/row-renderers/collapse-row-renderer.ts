import { Component, Input, OnInit } from '@angular/core';
import { RowSettings } from '@core/table/table.component';
import { selectEffectiveTheme } from '@core/core.module';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'table-collapse-row-renderer',
  template: `
    <div class='row p-2 ml-3 mr-3 mt-2 mb-2 justify-content-between' (mouseover)='mouseOver()'
         (mouseleave)='mouseLeave()' (click)='onRowSelect()'>
      <div>
        <div>{{data.taskTitle.title}}</div>
        <div>{{data.taskTitle.subTitle}}</div>
      </div>
      <div class='mt-auto mb-auto'>
        <div class='text-right'>{{data.progress.title}}</div>
        <div>{{data.progress.subTitle}}</div>
      </div>
      <div class='mt-auto mb-auto'>
        <svg-icon [hidden]='!isEditIconVisible' [src]="'assets/icons/pen.svg'" [applyClass]='true'
                  [svgStyle]="{ 'fill': null , 'width.em': '1.5'}" (click)='onEditClick()'></svg-icon>
      </div>
    </div>
    <div class='pl-4 pr-4 bg-gray' [class.bg-gray]='(theme$ | async) === "green-theme"' [class.bg-dark]='(theme$ | async) === "black-theme"' [hidden]='!isRowExpanded'>
      <div class='w-100 row justify-content-between p-4'>
        <div>
          <div *ngFor='let item of data.extendedInfo.info'>
            {{item}}
          </div>
        </div>
        <div>
          <div>
            Part Details:
          </div>
          <div *ngFor='let item of data.extendedInfo.partDetails'>
            {{item}}
          </div>
        </div>
      </div>
      <div class='text-right pb-1 cursor-pointer' (click)='onAddNoteClick()'>
        + Add a note
      </div>
    </div>
  `,
  styles: [
    `
      .bg-gray {
        background: #efefef;
      }

      .bg-dark {
        background: #121212;
      }

      .cursor-pointer {
        cursor: pointer;
      }

      .tableRow:hover {
        background: #e6f7ef !important;
      }
    `
  ]
})
export class CollapseRowRendererComponent implements OnInit {
  @Input() data;
  @Input() setting: RowSettings;

  selectEffectiveTheme = selectEffectiveTheme;

  isEditIconVisible = false;
  isRowExpanded = false;
  theme$: Observable<string>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(this.selectEffectiveTheme));
  }

  onRowSelect(): void {
    this.isRowExpanded = !this.isRowExpanded;
  }

  mouseOver(): void {
    this.isEditIconVisible = true;
  }

  mouseLeave(): void {
    this.isEditIconVisible = false;
  }

  onEditClick(): void {
    this.setting.onClick(this.data, this.data.id);
  }

  onAddNoteClick(): void {
    this.setting.onClick(this.data, this.data.id, 'addNoteDialog');
  }

}

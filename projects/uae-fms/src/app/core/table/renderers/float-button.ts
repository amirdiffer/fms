import { Component, Input, OnInit } from '@angular/core';
import { RowSettings } from '@core/table/table.component';
import { SettingsFacade } from '@core/settings/settings.facade';

@Component({
  selector: 'float-button-renderer',
  template: `
    <div
      class="float-button"
      [ngStyle]="{
        right: lang == 'en' ? '20px' : null,
        left: lang == 'ar' ? '20px' : null
      }"
    >
      <ng-container *ngFor="let item of setting?.floatButton">
        <span (click)="item?.onClick(col, data, item.button)">
          <svg-icon
            [src]="getIcon(item.button)"
            class="svg-icon"
            [applyClass]="true"
            [svgStyle]="{ fill: item.color || null }"
          ></svg-icon>
        </span>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .float-button {
        display: flex;
        flex-direction: row;
        position: absolute;
        transform: translateY(-50%) translateX(0);
        background-color: #ffffff;
        padding: 1em;
        border-radius: 20px 0 0 20px;
        animation: 500ms ease-in-out 0s 1 fadein;
      }
      .float-button span {
        margin: 0 1em;
        cursor: pointer;
      }
      .svg-icon {
        fill: #0da06e;
        width: 24px;
        height: 24px;
      }
      @keyframes fadein {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `
  ]
})
export class FloatButton implements OnInit {
  @Input() data;
  @Input() col;
  @Input() setting;
  @Input() lang;

  assetPath = '../../../../assets/icons/';

  constructor() {}

  ngOnInit() {}

  getIcon(key: string): string {
    switch (key) {
      case 'external': {
        return this.assetPath + 'external-link.svg';
      }
      case 'download': {
        return this.assetPath + 'download.svg';
      }
      case 'edit': {
        return this.assetPath + 'edit.svg';
      }
      case 'cancel': {
        return this.assetPath + 'cancel.svg';
      }
      case 'checked': {
        return this.assetPath + 'checked.svg';
      }
    }
  }
}

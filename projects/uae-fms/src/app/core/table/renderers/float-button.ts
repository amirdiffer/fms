import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RowSettings } from '@core/table/table.component';
import { SettingsFacade } from '@core/settings/settings.facade';
import { UserProfileFacade } from '@feature/user/state';

@Component({
  selector: 'float-button-renderer',
  template: `
    <div
      class="float-button"
      [ngStyle]="{
        right: col.hasJobCardButton
          ? lang == 'en'
            ? '14em'
            : null
          : lang == 'en'
          ? '20px'
          : null,
        left: lang == 'ar' ? '20px' : null
      }"
    >
      <ng-container *ngFor="let item of setting?.floatButton">
        <ng-container *ngIf="checkPermission(item)">
          <span *ngIf="checkCondition(item)" (click)="clicked(item, col, data)" (mouseenter)="item.tooltip ? tooltipEnter() : null" (mouseleave)="item.tooltip ? tooltipLeave() : null">
            <p *ngIf="item.button == 'folder-check' && item.tooltip" class="tooltip-float-button" #tooltip>{{item.tooltip}}</p>
            <svg-icon
              *ngIf="item.button !=='receive'"
              [src]="getIcon(item.button)"
              class="svg-icon"
              [applyClass]="true"
              [svgStyle]="{ 'fill': item.color || null , 'width.em':(item.button == 'folder-check'? 2 : 1.8)}"
            ></svg-icon>
            <img *ngIf="item.button ==='receive'" 
                  [src]="getIcon(item.button)" 
                  [ngStyle]="{ 'width.em':2.1 , 'margin-top':'3px'}"/>
          </span>
        </ng-container>
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
        background-color: #e6f7ef;
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
      .tooltip-float-button{
        opacity:0;
        background: #0da06e !important;
        color: #fff !important;
        font-size: .8em !important;
        padding: 2px 5px;
        border-radius: .3em;
        margin: 0;
        position: absolute;
        top: -30%;
        transform: translate(-35%, 0);
      }
      .animation-fade{
        opacity:1;
        animation: 500ms ease-in-out 0s 1 fadein;
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
  @ViewChild('tooltip') tooltip: ElementRef
  assetPath = 'assets/icons/';

  constructor(private _facadeProfile: UserProfileFacade) { }

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
      case 'folder-check': {
        return this.assetPath + 'folder-check.svg';
      }
      case 'approve': {
        return this.assetPath + 'check-circle.svg';
      }
      case 'reject': {
        return this.assetPath + 'times-circle.svg';
      }
      case 'receive': {
        return this.assetPath + 'received.png';
      }
    }
  }

  clicked(item, col, data) {
    if (item && item.onClick && item.onClick instanceof Function) {
      item.onClick(col, data, item.button);
    }
  }
  tooltipEnter() {
    this.tooltip?.nativeElement?.classList.add('animation-fade')
  }
  tooltipLeave() {
    this.tooltip?.nativeElement?.classList.remove('animation-fade')
  }

  checkCondition(setting) {
    if (setting?.condition && setting?.condition instanceof Function) {
      return setting.condition(this.data);
    } else
      return true;
  }
  checkPermission(setting){
    let hasPermission = false;
    this._facadeProfile.loadData$.subscribe(x => {
      if (x && x.roles[0].permissions && setting.permission) {
        for (const checkPermission of setting.permission) {
          const permissionFound = x.roles[0].permissions.find(x => x.toUpperCase() === checkPermission.toUpperCase());
          if(permissionFound || checkPermission === 'AlLOW_ALWAYS'){
              hasPermission = true;
          }
        }
      }
    })
    return hasPermission;
    
  }
}

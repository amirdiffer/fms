import { Component, Input, OnInit } from '@angular/core';
import { FakeServiceAuctionList } from '@feature/workshop/inspections/auction-list/_fake-service.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-boolean-renderer',
  template: `
    <div class="d-flex" *ngIf="data">
      <img class="asset-image" src="assets/icons/check.svg" />
    </div>
    <div class="d-flex" *ngIf="!data && !isOpen">
      <svg-icon
        [src]="externalLink"
        class="icon24px pointer"
        (click)="editOpen()"
        [svgStyle]="{ fill: '#0da06e' }"
      ></svg-icon>
    </div>
    <div class="d-flex" *ngIf="isOpen">
      <svg-icon
        [src]="delete"
        class="icon24px pointer"
        (click)="editClose()"
        [svgStyle]="{ 'width.px': 20, fill: 'red' }"
      ></svg-icon>
    </div>
  `,
  styles: [
    `
      div .asset-image {
        max-width: 60px;
        max-height: 60px;
        border-radius: 4px;
      }

      div .asset-name {
        margin-left: 10px;
        text-align: left;
        font-size: 15px;
        color: #000000de;
      }

      div .asset-info {
        margin-left: 10px;
        text-align: left;
        font-size: 12px;
        color: #000000de;
      }
      div .asset-badge {
        margin-left: 10px;
        text-align: left;
        font-size: 12px;
        color: #ffffff;
        width: max-content;
        padding: 2px 8px;
      }
      .icon24px {
        width: 24px;
        height: 24px;
        color: #0da06e;
      }
      .pointer {
        cursor: pointer;
      }
    `
  ]
})
export class TableBooleanRendererComponent implements OnInit {
  @Input() data: boolean;
  isOpen: boolean = false;
  fileServerBase = environment.baseFileServer;
  externalLink = 'assets/icons/external-link.svg';
  delete = 'assets/icons/times.svg';
  constructor(private _fakeService: FakeServiceAuctionList) {}

  ngOnInit() {}
  editOpen() {
    this.isOpen = true;
    this._fakeService.loadEdit(true);
  }
  editClose() {
    this.isOpen = false;
    this._fakeService.loadEdit(false);
  }
  getStatusColor(status: string): string {
    switch (status) {
      case 'owned': {
        return '#FCB614';
      }
      default: {
        return '#000000';
      }
    }
  }
}

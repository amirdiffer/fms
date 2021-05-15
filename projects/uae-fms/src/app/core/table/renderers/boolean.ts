import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { FakeServiceAuctionList } from '@feature/workshop/inspections/auction-list/_fake-service.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-boolean-renderer',
  template: `
    <div class="d-flex justify-content-between">
      <div class="d-flex icon-box">
        <img
          *ngIf="data"
          (load)="selectField('close')"
          class="asset-image"
          src="assets/icons/check.svg"
        />
      </div>
      <!-- <div class="d-flex icon-box">
        <svg-icon
          *ngIf="!data && !isOpen && hover == indexTR"
          [src]="externalLink"
          class="icon24px pointer"
          (click)="editOpen(); selectField('open'); setting?.onClick(allData)"
          [svgStyle]="{ fill: '#0da06e' }"
        ></svg-icon>
        <svg-icon
          *ngIf="isOpen"
          [src]="delete"
          class="icon24px pointer"
          (click)="editClose(); selectField('close')"
          [svgStyle]="{ 'width.px': 20, fill: '#fff' }"
        ></svg-icon>
      </div> -->
    </div>
  `,
  styles: [
    `
      .icon-box {
        width: 24px;
        height: 24px;
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
  @Input() indexTR: number;
  @Input() hover: number;
  @Input() setting;
  @Input() allData;
  @Output() selectTR: EventEmitter<Array<any>> = new EventEmitter();
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
  selectField(data) {
    this.selectTR.emit([data, this.indexTR]);
  }
}

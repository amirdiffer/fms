import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fuel-card-renderer',
  template: `
    <div class=" ">
      <div class="d-inline-flex w-100 py-2 ">
        <button class="border-0 bg-transparent">
          <img
            *ngIf="OpenedItem"
            (click)="OpenedItem = false"
            src="assets/icons/plus_fill.svg"
            width="18"
          />
          <img
            *ngIf="!OpenedItem"
            (click)="OpenedItem = true"
            src="assets/icons/plus_square.svg"
            width="18"
          />
        </button>
        <span>{{ this.data.tagNo }}</span>
      </div>
      <div *ngIf="OpenedItem" class="detail-box-container">
        <div *ngFor="let item of data.data" class="d-flex detail-box">
          <p class="d-inline-block">{{ item.litters }} Litters</p>
          <p class="d-inline-block mx-1">{{ item.km }} KM</p>
          <p class="d-inline-block">
            {{ item.day }} {{ item.date }} {{ item.time }}
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .detail-box-container {
        width: max-content;
        margin-left: 35px;
        border-left: 2px solid #475f7b;
        margin-left: 12px;
      }
      .detail-box {
        margin-bottom: 20px;
        padding: 25px 0 0 0;
        line-height: 0.1em;
        direction: ltr;
      }
      .detail-box:before {
        content: '';
        display: block;
        width: 16px;
        height: 2px;
        background: #475f7b;
        margin-right: 5px;
      }
      .detail-box p {
        white-space: nowrap;
        margin: 0;
      }
    `
  ]
})
export class FuelCardRendererComponent implements OnInit {
  @Input() data;
  items = [];
  OpenedItem: boolean = false;
  constructor() {}

  ngOnInit() {
    this.items = this.data.data;
  }
}

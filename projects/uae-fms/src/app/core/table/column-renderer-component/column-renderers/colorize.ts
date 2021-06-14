import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table-colorize-renderer',
  template: `
    <div>
      <div *ngIf="!options.condition(data)" class="">{{ data }}</div>
      <div *ngIf="options.condition(data)" [style]="'color:'+options.color+'; font-weight:800;'">{{ data }}</div>
    </div>
  `,
  styles: []
})
export class ColorizeRendererComponent implements OnInit {
  @Input() data;
  @Input() options;

  constructor() { }

  ngOnInit() {
   }
}

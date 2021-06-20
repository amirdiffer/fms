import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table-progress-renderer',
  template: `
    <circle-progress
      [percent]="data"
      [radius]="30"
      [showInnerStroke]="false"
      [outerStrokeWidth]="5"
      [outerStrokeColor]="
        data <= 50 ? '#FCB614' : data === 100 ? '#42D0D9' : '#20E19D'
      "
      [animation]="true"
      [animationDuration]="300"
      [showSubtitle]="false"
    ></circle-progress>
  `
})
export class ProgressRendererComponent implements OnInit {
  @Input() data: number;

  constructor() {}

  ngOnInit(): void {}
}

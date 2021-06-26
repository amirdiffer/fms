import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table-low-opacity-renderer',
  template: `
    <div>
      <span class="mr-3" pTooltip='{{data.column}}' tooltipPosition='bottom'>{{ data.column }}</span>
      <span class="subtitle" pTooltip='{{data.subtitle}}' tooltipPosition='bottom'>{{ data.subtitle }}</span>
    </div>
  `,
  styles: [
    `
      .subtitle {
        opacity: 0.8;
      }
    `
  ]
})
export class LowOpacityColumnRendererComponent implements OnInit {
  @Input() data: any;
  constructor() {}

  ngOnInit() {}
}

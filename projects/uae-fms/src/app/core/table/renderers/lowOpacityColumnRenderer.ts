import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table-low-opacity-renderer',
  template: `
    <div>
      <span class="mr-3">{{ data.column }}</span>
      <span class="subtitle">{{ data.subtitle }}</span>
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

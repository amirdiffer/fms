import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'table-subText-renderer',
  template: `
    <div>
      <div class="" pTooltip='{{dataName}}' tooltipPosition='bottom'>{{ dataName }}</div>
      <small pTooltip='{{subData}}' tooltipPosition='bottom'> {{ subData }} </small>
    </div>
  `,
  styles: []
})
export class SubtextRendererComponent implements OnInit {
  @Input() data;
  dataName;
  subData;
  fileServerBase = environment.baseFileServer;

  constructor() {}

  ngOnInit() {
    this.dataName = this.data[Object.keys(this.data)[0]];
    this.subData = this.data[Object.keys(this.data)[1]];
  }
}

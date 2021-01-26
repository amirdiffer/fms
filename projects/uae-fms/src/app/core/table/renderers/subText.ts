import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-subText-renderer',
  template: `
    <div>
      <div class="">{{ dataName }}</div>
      <small> {{ subData }} </small>
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

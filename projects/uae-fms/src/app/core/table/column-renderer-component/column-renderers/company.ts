import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'table-company-renderer',
  template: `
    <div>
      <img
        class="company-image"
        [src]="fileServerBase + company.thumbField_Make"
      />
    </div>
  `,
  styles: [
    `
      div .company-image {
        max-width: 40px;
        max-height: 40px;
      }
    `
  ]
})
export class TableCompanyRendererComponent implements OnInit {
  @Input() company;
  fileServerBase = environment.baseFileServer;

  constructor() {}

  ngOnInit() {}
}

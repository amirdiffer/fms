import { Component, Input, OnInit } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'table-external-link-renderer',
  template: `
    <div>
      <a [href]="link" target="_blank"
        ><fa-icon class="icon24px" [icon]="faExternalLinkAlt"></fa-icon
      ></a>
    </div>
  `,
  styles: [
    `
      .icon24px {
        width: 24px;
        height: 24px;
        color: #0da06e;
      }
    `
  ]
})
export class TableExternalLinkRendererComponent implements OnInit {
  @Input() link;
  faExternalLinkAlt = faExternalLinkAlt;

  constructor() {}

  ngOnInit() {}
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table-external-link-renderer',
  template: `
    <div>
      <a [href]="link" target="_blank">
      <svg-icon [src]="externalLink" class="icon24px"></svg-icon>
      </a>
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
  externalLink='assets/icons/external-link.svg'
  constructor() {}

  ngOnInit() {}
}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'table-route-link-renderer',
  template: `
    <div class="router-link-container">
      <a (click)="redirect()">
        <svg-icon
          [src]="externalLink"
          class="icon24px"
          [svgStyle]="{ width: '1.3em' }"
        ></svg-icon>
      </a>
    </div>
  `,
  styles: [
    `
      .router-link-container {
        position: relative;
        width: 100%;
        height: 100%;
      }
      .router-link-container a {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .icon24px {
        color: #0da06e;
        cursor: pointer;
      }
    `
  ]
})
export class TableRouteLinkRendererComponent implements OnInit {
  @Input() link;
  externalLink = 'assets/icons/external-link.svg';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  redirect() {
    this.router.navigate([this.link], { relativeTo: this.route });
  }
}

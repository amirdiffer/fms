import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'table-route-link-renderer',
  template: `
    <div>
      <a (click)="redirect()">
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
export class TableRouteLinkRendererComponent implements OnInit {
  @Input() link;
  externalLink = 'assets/icons/external-link.svg';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  redirect() {
    this.router.navigate([this.link], { relativeTo: this.route });
  }
}

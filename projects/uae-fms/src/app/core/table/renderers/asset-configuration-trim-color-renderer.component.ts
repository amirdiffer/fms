import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'table-trim-color-renderer',
  template: `
    <div class="d-flex">
      <div class="d-flex mx-1" *ngFor="let color of colors">
      <span
        [class.bg-dark]="
          color.hexColor.toLowerCase() === 'ffffff' ||
          color.hexColor.toLowerCase() === '#ffffff'
        "
        [class.bg-white]="
          color.hexColor.toLowerCase() === '000000' ||
          color.hexColor.toLowerCase() === '#000000'
        "
        class="status"
      >
        <svg-icon
          *ngIf="!color.hexColor.includes('#')"
          class="car-icon"
          src="assets/icons/car-solid.svg"
          [svgStyle]="{
            'width.px': 20,
            fill: '#' + color.hexColor,
            height: '100%'
          }"
        >
        </svg-icon>
        <svg-icon
          *ngIf="color.hexColor.includes('#')"
          class="car-icon"
          src="assets/icons/car-solid.svg"
          [svgStyle]="{
            'width.px': 20,
            fill: color.hexColor,
            height: '100%'
          }"
        >
        </svg-icon>
      </span>
      </div>
    </div>
  `,
  styleUrls: ['./trim-color-renderer.scss']
})
export class AssetConfigurationTrimColorRendererComponent implements OnInit {
  @Input() colors;
  fileServerBase = environment.baseFileServer;

  constructor() {}

  ngOnInit() {}
}

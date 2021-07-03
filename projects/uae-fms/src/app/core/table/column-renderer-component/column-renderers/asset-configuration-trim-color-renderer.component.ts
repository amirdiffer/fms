import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'table-trim-color-renderer',
  template: `
          <div class="d-flex">
            <div class="d-flex" *ngFor="let color of colors">
              <span class='color-circle mb-2 ml-2 mr-2'
                  [ngStyle]="{'background': color.hexColor}"
                  [class.bg-dark]="color.hexColor.toLowerCase() === 'ffffff' || color.hexColor.toLowerCase() === '#ffffff'">
                <svg-icon *ngIf="color.hexColor.includes('#')"
                          src='assets/icons/car-solid.svg' class='car-icon'
                          [svgStyle]="{ 'width.px':20 , 'fill': '#fff' , 'height': '80%'}">
                </svg-icon>
                <svg-icon *ngIf="!color.hexColor.includes('#')"
                          src='assets/icons/car-solid.svg' class='car-icon'
                          [svgStyle]="{ 'width.px':20 , 'fill': '#' + 'fff' , 'height': '80%'}">
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

import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'table-download-button-renderer',
  template: `
    <div class="d-flex align-items-center" *ngFor="let l of link">
      <img src="assets/icons/download-solid.svg" />
      <a class="mt-2 ml-2" target="_blank" [href]="fileServerBase + l">Download</a>
    </div>
  `,
  styles: [`
    img{
      width:1.3em;
    }
  `]
})
export class DownloadButtonRendererComponent implements OnInit {
  @Input() link = '';
  fileServerBase = environment.baseFileServer;

  constructor() {}

  ngOnInit() {

  }
}

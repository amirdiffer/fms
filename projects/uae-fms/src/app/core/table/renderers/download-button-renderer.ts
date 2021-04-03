import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'table-download-button-renderer',
  template: `
    <div class="d-flex">
      <img src="assets/icons/download-solid.svg" />
      <a class="mt-3 ml-2" [href]="link">Download</a>
    </div>
  `,
  styleUrls: ['./download-button-renderer.scss']
})
export class DownloadButtonRendererComponent implements OnInit {
  @Input() link = '';
  fileServerBase = environment.baseFileServer;

  constructor() {}

  ngOnInit() {}
}

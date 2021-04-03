import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'table-checkbox-renderer',
  template: `
    <div class="form-group form-check">
      <input
        id="checkbox1"
        type="checkbox"
        class="custom-checkbox"
        name="checkbox1"
      />
      <label>{{ label }}</label>
    </div>
  `,
  styleUrls: ['./checkbox-renderer.scss']
})
export class CheckboxRendererComponent implements OnInit {
  @Input() label = '';
  fileServerBase = environment.baseFileServer;

  constructor() {}

  ngOnInit() {}
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
        [(ngModel)]="data[field].checkbox"
        (change)="onChange.emit(this.data)"
      />
      <label>{{ data[field].label }}</label>
    </div>
  `,
  styleUrls: ['./checkbox-renderer.scss']
})
export class CheckboxRendererComponent implements OnInit {
  @Input() data;
  @Input() field;
  @Output() onChange = new EventEmitter();
  fileServerBase = environment.baseFileServer;

  constructor() {}

  ngOnInit() {}
}

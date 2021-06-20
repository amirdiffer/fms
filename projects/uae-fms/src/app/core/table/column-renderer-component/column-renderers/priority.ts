import { Component, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'table-priority-renderer',
  template: `
    <div class="flag-container">
      <svg-icon
        [src]="flagIcon"
        [svgStyle]="{ 'width.px': 24, fill: color, height: '100%' }"
      >
      </svg-icon>
    </div>
  `,
  styles: [``]
})
export class PriorityRendererComponent implements OnInit {
  @Input() data;
  flagIcon = 'assets/icons/flag-solid.svg';
  color = '#FCB614';
  constructor(private _renderer: Renderer2) {}

  ngOnInit() {
    switch (this.data) {
      case 'ugrent':
        this.color = '#F75A4A';
        break;
      case 'hight':
        this.color = '#FCB614';
        break;
      case 'normal':
        this.color = '#00CBB2';
        break;
      case 'low':
        this.color = '#707070';
        break;
      default:
        this.color = '#FCB614';
        break;
    }
  }
}

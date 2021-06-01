import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table-progress-renderer',
  template: `
    <div class='progress'>
      <div class='progress-bar' [ngStyle]='{ "width": (data + "%") }' [ngClass]='(data >= 50) ? "more-than-half" : "less-than-half"'></div>
    </div>
  `,
  styles: [`
    .less-than-half {
      background-color: red;
    }

    .more-than-half {
      background-color: greenyellow;
    }
  `]
})

export class ProgressRendererComponent implements OnInit {

  @Input() data: number;

  ngOnInit(): void {
  }
}

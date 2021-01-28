import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'anms-progress-bar',
  template: `
    <div class="progress-bar-container">
      <div class="progress">
        <div class="progress-bar" #progressBar></div>
      </div>
      <small #small>{{ value }}<ng-content></ng-content></small>
    </div>
  `,
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit {
  @Input() color;
  @Input() maxValue;
  @Input() value;
  @ViewChild('progressBar', { static: true }) progressBar: ElementRef;
  @ViewChild('small', { static: true }) small: ElementRef;
  percent;
  constructor(private _renderer: Renderer2) {}

  ngOnInit(): void {
    this.percent = (+this.value * 100) / +this.maxValue;
    this._renderer.setStyle(
      this.progressBar.nativeElement,
      'width',
      `${this.percent}%`
    );
    this._renderer.setStyle(
      this.progressBar.nativeElement,
      'background-color',
      `${this.color}`
    );
  }
}

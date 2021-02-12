import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'anms-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {
  @Input('status') status: string = 'light'; // check style file for status list
  @Input('closeable') closeable: boolean = true;
  @Input('text') text: string = 'This is example text message';

  showComponent: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  getClassName(status: string): string {
    return status ? 'alert-' + status : null;
  }

  closeAlert(): void {
    this.showComponent = !this.showComponent;
  }
}

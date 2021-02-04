import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'anms-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {
  @Input('error') error;
  @Input('showError') showError: boolean;

  /**
   * the string label in translation file
   */

  ngOnInit(): void {}

  constructor(private translateService: TranslateService) {}

  getError() {}
}

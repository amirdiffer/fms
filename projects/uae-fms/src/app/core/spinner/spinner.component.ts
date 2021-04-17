import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  /** input to show or hide spinner */
  showSpinner: boolean;
  /** input to show fullSpinner UI */
  @Input() fullSpinner: boolean;
  spinnerSubscription;
  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    /** controlling enabling and disabling the spinner observed in loaderService using BehaviorSubject object */
    this.spinnerSubscription = this.spinnerService.status.subscribe((val: boolean) => {
      this.showSpinner = val;
    });
  }

  ngOnDestroy() {
    if (this.spinnerSubscription != null) {
       this.spinnerSubscription.unsubscribe();
    }
  }

}

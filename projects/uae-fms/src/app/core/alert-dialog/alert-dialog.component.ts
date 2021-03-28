import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AlertDialogComponent implements OnInit {
  @Input('settings') settings: IDialogAlert;
  @Input('displayModal') displayModal: boolean;
  @Output() confirm = new EventEmitter<boolean>();
  timesCircle = 'assets/icons/times-circle.svg';
  checkCircle = 'assets/icons/check-circle.svg';
  warningTriangle = 'assets/icons/exclamation-triangle.svg';
  constructor() {}

  ngOnInit(): void {}
  confirmDialog() {
    this.displayModal = false;
    this.confirm.emit(true);
  }
  cancelDialog() {
    this.displayModal = false;
    this.confirm.emit(false);
  }
}

export interface IDialogAlert {
  header: string;
  hasHeader?: boolean; // design system alert dialog
  hasError?: boolean; // Error -  if is true Warning mode doesn't work
  isWarning?: boolean; // Warning
  message: string;
  confirmButton?: string;
  cancelButton?: string;
}

/* example */
/*
  .html
      <alert-dialog [settings]="dialogSetting" [displayModal]="dialogModal" (confirm)="dialogConfirm($event)"></alert-dialog>
  .ts
      dialogSetting : IDialogAlert ={
          header:'Header is Here',
          hasError:false,
          message:'Message is Here',
          confirmButton: 'Register Now',
          cancelButton:'Cancel',
      }
*/

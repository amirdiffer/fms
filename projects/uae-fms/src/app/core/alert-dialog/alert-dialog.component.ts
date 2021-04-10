import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AlertDialogComponent implements OnInit {
  //#region Input and Outputs
  @Input('settings') settings: IDialogAlert;
  @Input('displayModal') displayModal: boolean;
  @Output() confirm = new EventEmitter<any>();
  //#endregion

  //#region  Variables
  timesCircle = 'assets/icons/times-circle.svg';
  checkCircle = 'assets/icons/check-circle.svg';
  warningTriangle = 'assets/icons/exclamation-triangle.svg';
  //#endregion

  constructor() { }

  ngOnInit(): void { }

  confirmDialog() {
    this.displayModal = false;
    this.confirm.emit(true);
  }

  cancelDialog() {
    this.displayModal = false;
    this.confirm.emit(false);
  }

  dialogEvent(event) {
    this.displayModal = false;
    this.confirm.emit(event);
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
  buttons?: buttons[];
}
export interface buttons {
  title: string;
  eventEmit: string;
}

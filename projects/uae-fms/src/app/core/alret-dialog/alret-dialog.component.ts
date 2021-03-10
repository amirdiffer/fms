import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'alret-dialog',
  templateUrl: './alret-dialog.component.html',
  styleUrls: ['./alret-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlretDialogComponent implements OnInit {
  @Input ('settings') settings : IDialogAlert;
  @Input('displayModal') displayModal : boolean;
  @Output() confirm =  new EventEmitter<boolean>();
  timesCircle="assets/icons/times-circle.svg";
  checkCircle="assets/icons/check-circle.svg";
  constructor() { }

  ngOnInit(): void {
  }
  confirmDialog(){
    this.displayModal = false;
    this.confirm.emit(true)
  }
  cancelDialog(){
    this.displayModal = false;
    this.confirm.emit(false)
  }

}

export interface IDialogAlert{
  header:string;
  hasHeader?:boolean;
  hasError?:boolean;
  message:string;
  confirmButton?: string;
  cancelButton: string;
}

/* example */
/*
  .html
      <alret-dialog [settings]="dialogSetting" [displayModal]="dialogModal" (confirm)="dialogConfirm($event)"></alret-dialog>
  .ts
      dialogSetting : IDialogAlert ={
          header:'Header is Here',
          hasError:false,
          message:'Message is Here',
          confirmButton: 'Register Now',
          cancelButton:'Cancel',
      }
*/

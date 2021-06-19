import {
  Component,
  Injectable,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SettingsFacade } from '@core/settings/settings.facade';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'anms-dialog-template-component',
  templateUrl: 'dialog-template.component.html',
  styleUrls: ['./dialog-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogTemplateComponent implements OnInit {
  textInput = '';

  dialogSetting!: DialogSetting;

  isLtr = true;

  dialogClosed$: Observable<DialogResult>;
  dialogTextInput$: Observable<string>;

  timesCircle = 'assets/icons/times-circle.svg';
  checkCircle = 'assets/icons/check-circle.svg';
  warningTriangle = 'assets/icons/exclamation-triangle.svg';

  private dialogClosed = new Subject<DialogResult>();
  private dialogTextInput = new Subject<string>();
  private settingsFacadeSubscription!: Subscription;

  constructor(
    private dialogRef: MatDialogRef<DialogTemplateComponent>,
    private settingsFacade: SettingsFacade
  ) {
    this.dialogClosed$ = this.dialogClosed.asObservable();
    this.dialogTextInput$ = this.dialogTextInput.asObservable();

    this.settingsFacadeSubscription = settingsFacade.language.subscribe(
      (lang) => {
        this.isLtr = lang === 'en';
      }
    );
  }

  ngOnInit(): void {}

  onClose(type: DialogResult): void {
    if (type === 'confirm') {
      this.dialogClosed.next('confirm');
    } else {
      this.dialogClosed.next('cancel');
    }

    if (this.dialogSetting.hasTextInput) {
      this.dialogTextInput.next(this.textInput);
    }

    this.dialogRef.close();
  }
}

export type DialogStatus = 'success' | 'warning' | 'danger';
export type DialogResult = 'confirm' | 'cancel';

export interface DialogSetting {
  status: DialogStatus;
  title: string;
  message: string;
  hasTextInput?: boolean;
  confirmButtonTitle?: string;
  cancelButtonTitle?: string;
}

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {}

  show(
    status: DialogStatus,
    title: string,
    message: string,
    confirmButtonTitle: string = 'Confirm',
    cancelButtonTitle: string = 'Cancel',
    hasTextInput: boolean = false
  ): DialogTemplateComponent {

    this.dialog.closeAll();

    const dialog = this.dialog.open(DialogTemplateComponent, {
      width: '50%',
      disableClose: true
    });

    dialog.componentInstance.dialogSetting = {
      status,
      title,
      message,
      hasTextInput,
      confirmButtonTitle,
      cancelButtonTitle
    };

    return dialog.componentInstance;
  }
}
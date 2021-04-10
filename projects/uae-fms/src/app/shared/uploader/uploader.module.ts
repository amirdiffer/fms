import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from '@shared/uploader/uploader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ErrorModule } from '@shared/error/error.module';
import { TranslateModule } from '@ngx-translate/core';
import { AlertDialogModule } from '@core/alert-dialog/alert-dialog.module';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [UploaderComponent],
  exports: [UploaderComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatProgressBarModule,
    NgxFileDropModule,
    AngularSvgIconModule,
    ErrorModule,
    AlertDialogModule,
    DialogModule
  ]
})
export class UploaderModule {}

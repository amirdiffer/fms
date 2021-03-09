import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import { AlretDialogComponent } from './alret-dialog.component';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
  declarations: [AlretDialogComponent],
  imports: [
    CommonModule,
    DialogModule,
    AngularSvgIconModule
  ],
  exports:[AlretDialogComponent]
})
export class AlretDialogModule { }

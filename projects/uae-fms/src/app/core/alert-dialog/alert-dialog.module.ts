import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AlertDialogComponent } from './alert-dialog.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [AlertDialogComponent],
  imports: [CommonModule, DialogModule, AngularSvgIconModule],
  exports: [AlertDialogComponent]
})
export class AlertDialogModule {}

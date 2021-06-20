import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogTemplateComponent } from './dialog-template.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DialogTemplateComponent],
  imports: [CommonModule, AngularSvgIconModule.forRoot(), SharedModule]
})
export class DialogModule {}

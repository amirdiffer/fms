import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ErrorComponent],
  exports: [ErrorComponent],
  imports: [CommonModule, TranslateModule]
})
export class ErrorModule {}

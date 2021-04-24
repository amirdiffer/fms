import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderComponent } from './reminder.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ReminderComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports:[ReminderComponent]
})
export class ReminderModule { }

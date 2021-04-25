import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports:[HistoryComponent]
})
export class HistoryModule { }

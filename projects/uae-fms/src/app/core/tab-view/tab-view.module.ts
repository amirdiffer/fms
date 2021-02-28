import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewComponent } from './tab-view/tab-view.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TabViewComponent],
  exports: [TabViewComponent],
  imports: [CommonModule, TranslateModule]
})
export class TabViewModule {}

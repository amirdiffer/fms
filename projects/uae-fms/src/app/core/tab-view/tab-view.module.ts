import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewComponent } from './tab-view/tab-view.component';

@NgModule({
  declarations: [TabViewComponent],
  exports: [TabViewComponent],
  imports: [CommonModule]
})
export class TabViewModule {}

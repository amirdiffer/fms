import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FilterComponent],
  imports: [CommonModule, AngularSvgIconModule, TranslateModule],
  exports: [FilterComponent]
})
export class FilterModule {}

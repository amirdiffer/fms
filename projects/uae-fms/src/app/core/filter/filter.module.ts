import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterComponent} from './filter.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule
  ], exports: [FilterComponent]
})
export class FilterModule {}

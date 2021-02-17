import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { sidebarMenuReducer } from './state/sidebar-menu.reducer';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { SidebarMenuFacade } from './state/sidebar-menu.facade';
import { GeneralServicesModule } from '../general-services';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('sidebarMenu', sidebarMenuReducer),
    GeneralServicesModule,
    AngularSvgIconModule
  ],
  exports: [SidebarMenuComponent],
  declarations: [SidebarMenuComponent],
  providers: [SidebarMenuFacade]
})
export class SidebarMenuModule {
  constructor() { }
}

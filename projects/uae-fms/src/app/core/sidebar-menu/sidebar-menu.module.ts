import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { sidebarMenuReducer } from './state/sidebar-menu.reducer';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { SidebarMenuFacade } from './state/sidebar-menu.facade';
import { GeneralServicesModule } from '../general-services';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('sidebarMenu', sidebarMenuReducer),
    GeneralServicesModule,
    AngularSvgIconModule,
    SharedModule
  ],
  exports: [SidebarMenuComponent],
  declarations: [SidebarMenuComponent],
  providers: [SidebarMenuFacade]
})
export class SidebarMenuModule {
  constructor() {}
}

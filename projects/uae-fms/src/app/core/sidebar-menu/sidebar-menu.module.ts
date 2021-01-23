import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import {
  FaIconLibrary,
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import {
  faCar,
  faChartLine,
  faLayerGroup,
  faBus,
  faFile,
  faStore,
  faCog
} from '@fortawesome/free-solid-svg-icons';

import { sidebarMenuReducer } from './state/sidebar-menu.reducer';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { SidebarMenuFacade } from './state/sidebar-menu.facade';
import { GeneralServicesModule } from "../general-services";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    StoreModule.forFeature('sidebarMenu', sidebarMenuReducer),
    GeneralServicesModule
  ],
  exports: [SidebarMenuComponent],
  declarations: [SidebarMenuComponent],
  providers: [SidebarMenuFacade]
})
export class SidebarMenuModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faCar,
      faCalendarAlt,
      faChartLine,
      faLayerGroup,
      faBus,
      faFile,
      faStore,
      faCog
    );
  }
}

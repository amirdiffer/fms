import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { SidebarMenuModule } from '../sidebar-menu';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CoreModule } from '../core.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UserProfileModule } from '@feature/user/user.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    MatToolbarModule,
    SidebarMenuModule,
    MatButtonModule,
    MatIconModule,
    CoreModule,
    AngularSvgIconModule,
    UserProfileModule
  ],
  exports: [NavbarComponent],
  declarations: [NavbarComponent],
  providers: []
})
export class NavbarModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: NavbarModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}

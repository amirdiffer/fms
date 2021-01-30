import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { NavbarModule } from './core/navbar';
import { SidebarMenuModule } from './core/sidebar-menu/sidebar-menu.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { TemplateComponent } from './template/template.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UserProfileComponent } from './feature/user-profile/user-profile.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableModule } from 'primeng/table';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    MatSidenavModule,

    // core
    // CoreModule,
    SidebarMenuModule,

    // app
    NavbarModule,
    AppRoutingModule,

    // library
    AngularSvgIconModule.forRoot(),
    MatSlideToggleModule,
    MatCheckboxModule,
    TableModule,
    MatButtonModule
  ],
  declarations: [TemplateComponent, UserProfileComponent],
  bootstrap: [TemplateComponent]
})
export class AppModule {}

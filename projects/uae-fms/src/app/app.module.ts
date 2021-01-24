import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { NavbarModule } from './core/navbar';
import { SidebarMenuModule } from './core/sidebar-menu/sidebar-menu.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { TemplateComponent } from './template/template.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

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
    AngularSvgIconModule.forRoot()
  ],
  declarations: [TemplateComponent],
  bootstrap: [TemplateComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { NavbarModule } from './core/navbar';
import { SidebarMenuModule } from './core/sidebar-menu/sidebar-menu.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppComponent } from './app.component';
import { MainTemplateComponent } from './template/main-template/main-template.component';
import { LoginTemplateComponent } from './template/login-template/login-template.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatSidenavModule,
    SidebarMenuModule,
    NavbarModule,
    AppRoutingModule,
    AngularSvgIconModule.forRoot()
  ],
  declarations: [AppComponent, MainTemplateComponent, LoginTemplateComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

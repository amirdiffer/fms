import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { NavbarModule } from './core/navbar';
import { SidebarMenuModule } from './core/sidebar-menu/sidebar-menu.module';
import { SharedModule } from '@shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppComponent } from './app.component';
import { MainTemplateComponent } from './template/main-template/main-template.component';
import { LoginTemplateComponent } from './template/login-template/login-template.component';
import { DesignSystemComponent } from './template/design-system/design-system.component';
import { TechnicianOverviewComponent } from './template/technician-dashboard-template/technician-dashboard-template';
import { SpinnerComponent, SpinnerService } from '@core/spinner';
import { DialogService } from '@core/dialog/dialog-template.component';
import { DialogModule } from '@core/dialog/dialog.module';
import { CoreStateModule } from "@core/core.state.module";

@NgModule({
  imports: [
    CoreStateModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatSidenavModule,
    SidebarMenuModule,
    NavbarModule,
    AppRoutingModule,
    SharedModule,
    AngularSvgIconModule.forRoot(),
    DialogModule,
  ],
  declarations: [
    AppComponent,
    MainTemplateComponent,
    LoginTemplateComponent,
    DesignSystemComponent,
    TechnicianOverviewComponent,
    SpinnerComponent
  ],
  providers: [SpinnerService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }

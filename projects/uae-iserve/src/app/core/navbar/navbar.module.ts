import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NavbarComponent } from './navbar.component';
import { SidebarMenuModule } from '../sidebar-menu';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { faBars, faHistory, faGlobeAmericas, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { CoreModule } from "../core.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        MatToolbarModule,
        FontAwesomeModule,
        SidebarMenuModule,
        MatButtonModule,
        MatIconModule,
        CoreModule
    ],
    exports: [
        NavbarComponent
    ],
    declarations: [NavbarComponent],
    providers: [],
})

export class NavbarModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: NavbarModule,
        faIconLibrary: FaIconLibrary
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import only in AppModule');
        }
        faIconLibrary.addIcons(
            faBars,
            faBell,
            faSearch,
            faHistory,
            faGlobeAmericas
        );
    }
}

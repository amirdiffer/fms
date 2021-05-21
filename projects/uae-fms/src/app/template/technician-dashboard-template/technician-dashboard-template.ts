import { Component, OnInit } from '@angular/core';
import {
  authLogin,
  authLogout,
  routeAnimations,
  LocalStorageService,
  selectIsAuthenticated,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme
} from '@core/core.module';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'technician-template',
  templateUrl: 'technician-dashboard-template.html',
  styleUrls: ['technician-dashboard-template.scss']
})

export class TechnicianOverviewComponent implements OnInit {


  selectIsAuthenticated = selectIsAuthenticated;
  selectSettingsStickyHeader = selectSettingsStickyHeader;
  selectSettingsLanguage = selectSettingsLanguage;
  selectEffectiveTheme = selectEffectiveTheme;
  theme$: Observable<string>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.theme$ = this.store.pipe(select(this.selectEffectiveTheme));
  }
}

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import {
  selectEffectiveTheme,
  selectIsAuthenticated,
  selectSettingsLanguage,
  selectSettingsStickyHeader
} from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { TemplateComponent } from './template.component';

describe('TemplateComponent', () => {
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [provideMockStore()],
      declarations: [TemplateComponent]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectIsAuthenticated, false);
    store.overrideSelector(selectSettingsStickyHeader, true);
    store.overrideSelector(selectSettingsLanguage, 'en');
    store.overrideSelector(selectEffectiveTheme, 'default');
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(TemplateComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Language, State } from '@core/settings/settings.model';
import { actionSettingsChangeLanguage, actionSettingsChangeTheme } from '@core/settings/settings.actions';
import { selectSettingsLanguage } from '@core/settings/settings.selectors';


@Injectable()
export class SettingsFacade {
  constructor(private store: Store<State>) {}

  changeLanguage(language: Language): void {
    this.store.dispatch(actionSettingsChangeLanguage({ language: language }));
  }
  changeTheme(theme: string): void {
    this.store.dispatch(actionSettingsChangeTheme({ theme }));
  }

  language = this.store.pipe(select(selectSettingsLanguage))

}

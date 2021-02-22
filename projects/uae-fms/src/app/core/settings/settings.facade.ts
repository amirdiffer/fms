import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Language, State } from '@core/settings/settings.model';
import { actionSettingsChangeLanguage } from '@core/settings/settings.actions';

@Injectable()
export class SettingsFacade {
  constructor(private store: Store<State>) {}

  changeLanguage(language: Language): void {
    this.store.dispatch(actionSettingsChangeLanguage({language: language}))
  }

}

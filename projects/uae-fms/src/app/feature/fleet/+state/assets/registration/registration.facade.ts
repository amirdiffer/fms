import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RegistrationSelectors } from '@feature/fleet/+state/assets/registration/registration.selectors';
import { IRegistrationPartialState } from '@feature/fleet/+state/assets/registration/registration.entity';
import { RegistrationActions } from '@feature/fleet/+state/assets/registration/registration.actions';
@Injectable()
export class RegistrationFacade {
  registration$ = this.store.pipe(select(RegistrationSelectors.selectAll));
  conut$ = this.store.pipe(select(RegistrationSelectors.count));

  constructor(private store: Store<IRegistrationPartialState>) {}

  loadAll() {
    this.store.dispatch(RegistrationActions.loadAll());
  }
  register(data) {
    this.store.dispatch(RegistrationActions.registerAsset({ data }));
  }
}

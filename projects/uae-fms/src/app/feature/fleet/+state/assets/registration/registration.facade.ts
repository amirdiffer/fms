import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RegistrationSelectors } from '@feature/fleet/+state/assets/registration/registration.selectors';
import { IRegistrationPartialState } from '@feature/fleet/+state/assets/registration/registration.entity';
import { RegistrationActions } from '@feature/fleet/+state/assets/registration/registration.actions';
@Injectable()
export class RegistrationFacade {
  registration$ = this.store.pipe(select(RegistrationSelectors.selectAll));
  error$ = this.store.pipe(select(RegistrationSelectors.error));

  submitted$ = this.store.pipe(select(RegistrationSelectors.submitted));

  conut$ = this.store.pipe(select(RegistrationSelectors.count));
  assetForRegistration$ = this.store.pipe(
    select(RegistrationSelectors.assetForRegistration)
  );

  constructor(private store: Store<IRegistrationPartialState>) {}

  loadAll() {
    this.store.dispatch(RegistrationActions.loadAll());
  }
  register(data) {
    this.store.dispatch(RegistrationActions.registerAsset({ data }));
  }
  editRegister(register: any) {
    this.store.dispatch(RegistrationActions.editRegister({ register }));
  }

  getAssetForRegistration(assetId: number) {
    this.store.dispatch(
      RegistrationActions.loadAssetForRegistrationByAssetId({ assetId })
    );
  }
  resetParams() {
    this.store.dispatch(RegistrationActions.resetParams());
  }
}

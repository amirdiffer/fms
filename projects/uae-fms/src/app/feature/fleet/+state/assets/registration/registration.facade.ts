import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RegistrationSelectors } from './registration.selectors';
import { IRegisterAssetByChassisNumber, IRegisterAssetByPlateNumber, IRegistrationPartialState } from './registration.entity';
import { RegistrationActions } from './registration.actions';
@Injectable()
export class RegistrationFacade {
  registration$ = this.store.pipe(select(RegistrationSelectors.selectAll));

  error$ = this.store.pipe(select(RegistrationSelectors.error));

  submitted$ = this.store.pipe(select(RegistrationSelectors.submitted));

  conut$ = this.store.pipe(select(RegistrationSelectors.count));

  assetForRegistration$ = this.store.pipe( select(RegistrationSelectors.assetForRegistration));

  constructor(private store: Store<IRegistrationPartialState>) {
    this.loadAll();
  }

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

  registerByPlateNumber(data:IRegisterAssetByPlateNumber){
    this.store.dispatch(
      RegistrationActions.registerAssetByPlateNumber({ data })
    );
  }

  registerByChasisNumber(data:IRegisterAssetByChassisNumber){
    this.store.dispatch(
      RegistrationActions.registerAssetByChassisNumber({ data })
    );
  }
}

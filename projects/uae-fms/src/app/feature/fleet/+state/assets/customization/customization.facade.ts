import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CustomizationSelectors } from '@feature/fleet/+state/assets/customization/customization.selectors';
import { ICustomizationPartialState } from '@feature/fleet/+state/assets/customization/customization.entity';
import { CustomizationActions } from '@feature/fleet/+state/assets/customization/customization.actions';

@Injectable()
export class CustomizationFacade {
  customization$ = this.store.pipe(select(CustomizationSelectors.selectAll));
  conut$ = this.store.pipe(select(CustomizationSelectors.count));

  constructor(private store: Store<ICustomizationPartialState>) {}

  loadAll() {
    this.store.dispatch(CustomizationActions.loadAll());
  }
}

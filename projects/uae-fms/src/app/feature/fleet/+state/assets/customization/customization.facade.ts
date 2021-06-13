import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CustomizationSelectors } from './customization.selectors';
import { ICustomizationPartialState } from './customization.entity';
import { CustomizationActions } from './customization.actions';

@Injectable()
export class CustomizationFacade {
  customization$ = this.store.pipe(select(CustomizationSelectors.selectAll));
  conut$ = this.store.pipe(select(CustomizationSelectors.count));

  constructor(private store: Store<ICustomizationPartialState>) {this.loadAll()}

  loadAll() {
    this.store.dispatch(CustomizationActions.loadAll());
  }
}

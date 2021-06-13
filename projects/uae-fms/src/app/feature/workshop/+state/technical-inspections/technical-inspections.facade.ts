import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TechnicalInspectionActions } from './technical-inspections.actions';
import { ITechnicalInspectionPartialState } from './technical-inspections.entity';
import { TechnicalInspectionSelectors } from './technical-inspections.selectors';

@Injectable()
export class TechnicalInspectionFacade {
  bodyShop$ = this.store.pipe(select(TechnicalInspectionSelectors.selectAll));

  constructor(private store: Store<ITechnicalInspectionPartialState>) {this.loadAll()}

  loadAll() {
    this.store.dispatch(TechnicalInspectionActions.loadAll());
  }
}

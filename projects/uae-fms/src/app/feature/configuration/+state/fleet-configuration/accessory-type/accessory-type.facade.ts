import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AccessoryTypeActions } from './accessory-type.actions';
import { AccessoryTypePartialState } from './accessory-type.entity';
import { AccessoryTypeSelectors } from './accessory-type.selectors';

@Injectable()
export class AccessoryTypeFacade {
    accessoryType$ = this.store.pipe(select(AccessoryTypeSelectors.selectAll));

    specificAccessoryType$ = this.store.pipe(select(AccessoryTypeSelectors.specificAccessoryType));

    message$ = this.store.pipe(select(AccessoryTypeSelectors.message));

    error$ = this.store.pipe(select(AccessoryTypeSelectors.error));

    submitted$ = this.store.pipe(select(AccessoryTypeSelectors.submitted));

    loaded$ = this.store.pipe(select(AccessoryTypeSelectors.loaded));

    constructor(private store: Store<AccessoryTypePartialState>) {}

    loadAll() {
        this.store.dispatch(AccessoryTypeActions.loadAll());
    }

    addAccessoryType(data: any) {
        this.store.dispatch(AccessoryTypeActions.addAccessoryType({ data }));
    }

    updateAccessoryType(data: any) {
        this.store.dispatch(AccessoryTypeActions.updateAccessoryType({ data }));
    }
    
    getAccessoryTypeByID(id: number) {
        this.store.dispatch(AccessoryTypeActions.accessoryTypeById({ id }));
    }

    resetParams() {
        this.loadAll();
        this.store.dispatch(AccessoryTypeActions.resetParams());
    }
}
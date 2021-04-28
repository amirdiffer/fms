import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubAssetTypeActions } from './sub-asset-type.actions';
import { SubAssetTypePartialState } from './sub-asset-type.entity';
import { SubAssetTypeSelectors } from './sub-asset-type.selectors';

@Injectable()
export class SubAssetTypeFacade {
    subAssetType$ = this.store.pipe(select(SubAssetTypeSelectors.selectAll));

    specificSubAssetType$ = this.store.pipe(select(SubAssetTypeSelectors.specificSubAssetType));

    message$ = this.store.pipe(select(SubAssetTypeSelectors.message));

    error$ = this.store.pipe(select(SubAssetTypeSelectors.error));

    submitted$ = this.store.pipe(select(SubAssetTypeSelectors.submitted));

    loaded$ = this.store.pipe(select(SubAssetTypeSelectors.loaded));

    constructor(private store: Store<SubAssetTypePartialState>) {
        this.loadAll();
    }

    loadAll() {
        this.store.dispatch(SubAssetTypeActions.loadAll());
    }

    getSubAssetTypeByID(id: number) {
        this.store.dispatch(SubAssetTypeActions.subAssetTypeById({ id }));
    }

    addSubAssetType(data: any) {
        this.store.dispatch(SubAssetTypeActions.addSubAssetType({ data }));
    }

    updateSubAssetType(data: any) {
        this.store.dispatch(SubAssetTypeActions.updateSubAssetType({ data }));
    }

    addMake(data: any, subAssetTypeId: number) {
        this.store.dispatch(SubAssetTypeActions.addMake({ data, subAssetTypeId }));
    }

    addModel(data: any, subAssetTypeId: number, makeId: number) {
        this.store.dispatch(SubAssetTypeActions.addModel({ data, subAssetTypeId, makeId }));
    }
    resetParams() {
        this.loadAll();
        this.store.dispatch(SubAssetTypeActions.resetParams());
    }
}
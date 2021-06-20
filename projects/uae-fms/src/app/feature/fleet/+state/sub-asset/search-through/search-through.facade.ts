import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { SubAssetSearchThroughActions } from "./search-through.action";
import { ISubAssetSearchThroughState } from "./search-through.entity";
import { SubAssetSearchThroughSelectors } from "./search-through.selectors";


@Injectable()
export class SubAssetSearchThroughFacade {
    constructor(private store: Store<ISubAssetSearchThroughState>) {}

    searchSubAsset$ = this.store.pipe(select(SubAssetSearchThroughSelectors.selectAll));

    error$ = this.store.pipe(select(SubAssetSearchThroughSelectors.error));

    loaded$ = this.store.pipe(select(SubAssetSearchThroughSelectors.loaded));


    loadAvailableSubAssetWithModelId(id){
        this.store.dispatch(SubAssetSearchThroughActions.loadAvailableSubAssetWithModelId({id}));
    }

}

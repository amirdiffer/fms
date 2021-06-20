import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AssetSearchThroughActions } from "./search-through.actions";
import {  IAssetSearchThroughState } from "./search-through.entity";
import { AssetSearchThroughSelectors } from "./search-through.selectors";

@Injectable()
export class AssetSearchThroughFacade {
    constructor(private store: Store<IAssetSearchThroughState>) {}

    searchAsset$ = this.store.pipe(select(AssetSearchThroughSelectors.selectAll));

    error$ = this.store.pipe(select(AssetSearchThroughSelectors.error));

    loaded$ = this.store.pipe(select(AssetSearchThroughSelectors.loaded));

    loadAvailableAsset(){
        this.store.dispatch(AssetSearchThroughActions.loadAvailableAsset());
    }

    loadAvailableAssetForAddingRequest(){
        this.store.dispatch(AssetSearchThroughActions.loadAvailableAssetForAddingRequest());
    }

    loadAvailableAssetForAddingJobCard(){
        this.store.dispatch(AssetSearchThroughActions.loadAvailableAssetForAddingJobCard());
    }
}

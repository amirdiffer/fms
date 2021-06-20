import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {SubAssetSearchThroughFacade , SubAssetSearchThroughService} from "./index"
import { SubAssetSearchThroughEffects } from "./search-through.effect";
import {  FLEET_SUB_ASSET_SEARCH_THROUGH_FEATURE_KEY } from "./search-through.entity";
import * as subAssetSearchThroughReducer from "./search-through.reducer"
@NgModule({
    imports:[
        StoreModule.forFeature(FLEET_SUB_ASSET_SEARCH_THROUGH_FEATURE_KEY , subAssetSearchThroughReducer.reducer),
        EffectsModule.forFeature([SubAssetSearchThroughEffects])
    ],
    providers:[
        SubAssetSearchThroughFacade,
        SubAssetSearchThroughService
    ]

})


export class SubAssetSearchThroughStateModule {}

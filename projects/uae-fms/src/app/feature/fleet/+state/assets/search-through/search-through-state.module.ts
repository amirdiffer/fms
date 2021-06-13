import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AssetSearchThroughEffects } from "./search-through.effects";
import { FLEET_ASSET_SEARCH_THROUGH_FEATURE_KEY } from "./search-through.entity";
import * as assetSearchThroughReducer from './search-through.reducer'
import { AssetSearchThroughService , AssetSearchThroughFacade} from "./index";
@NgModule({
    imports:[
        StoreModule.forFeature(FLEET_ASSET_SEARCH_THROUGH_FEATURE_KEY , assetSearchThroughReducer.reducer),
        EffectsModule.forFeature([AssetSearchThroughEffects])
    ],
    providers:[
        AssetSearchThroughFacade,
        AssetSearchThroughService
    ]

})


export class AssetSearchThroughStateModule {}

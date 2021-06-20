import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {AccessorySearchThroughFacade , AccessorySearchThroughService} from "./index"
import { AccessorySearchThroughEffects } from "./search-through.effect";
import { FLEET_ACCESSORY_SEARCH_THROUGH_FEATURE_KEY } from "./search-through.entity";
import * as accessorySearchThroughReducer from "./search-through.reducer"
@NgModule({
    imports:[
        StoreModule.forFeature(FLEET_ACCESSORY_SEARCH_THROUGH_FEATURE_KEY , accessorySearchThroughReducer.reducer),
        EffectsModule.forFeature([AccessorySearchThroughEffects])
    ],
    providers:[
        AccessorySearchThroughFacade,
        AccessorySearchThroughService
    ]

})


export class AccessorySearchThroughStateModule {}

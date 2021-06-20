import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {OperatorSearchThroughFacade , OperatorSearchThroughService} from "./index"
import { OperatorSearchThroughEffects } from "./search-through.effect";
import { FLEET_OPERATOR_SEARCH_THROUGH_FEATURE_KEY } from "./search-through.entity";
import * as operatorSearchThroughReducer from "./search-through.reducer"
@NgModule({
    imports:[
        StoreModule.forFeature(FLEET_OPERATOR_SEARCH_THROUGH_FEATURE_KEY , operatorSearchThroughReducer.reducer),
        EffectsModule.forFeature([OperatorSearchThroughEffects])
    ],
    providers:[
        OperatorSearchThroughFacade,
        OperatorSearchThroughService
    ]

})


export class OperatorSearchThroughStateModule {}

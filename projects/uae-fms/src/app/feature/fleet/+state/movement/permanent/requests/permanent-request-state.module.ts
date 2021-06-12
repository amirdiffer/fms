import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MovementRequestsEffect } from "./movement-requests.effect";
import * as movementRequestReducer from "./movement-requests.reducer"
import { MovementRequestsService , MovementRequestsFacade } from "./index";
import { FLEET_MOVEMENT_REQUESTS_FEATURE_KEY } from "./movement-requests.entity";


@NgModule({
    imports:[
        StoreModule.forFeature(FLEET_MOVEMENT_REQUESTS_FEATURE_KEY , movementRequestReducer.reducer),
        EffectsModule.forFeature([MovementRequestsEffect])
    ],
    providers:[
        MovementRequestsService,
        MovementRequestsFacade
    ]
})

export class PermanentRequestStateModule {}
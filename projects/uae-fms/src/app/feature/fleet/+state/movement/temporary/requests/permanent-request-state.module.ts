import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MovementRequestsEffectTemporary } from "./movement-requests.effect";
import * as movementRequestReducer from "./movement-requests.reducer"
import { MovementRequestsServiceTemporary , MovementRequestsFacadeTemporary } from "./index";
import { FLEET_MOVEMENT_TEMPORARY_REQUESTS_FEATURE_KEY } from "./movement-requests.entity";


@NgModule({
    imports:[
        StoreModule.forFeature(FLEET_MOVEMENT_TEMPORARY_REQUESTS_FEATURE_KEY , movementRequestReducer.reducer),
        EffectsModule.forFeature([MovementRequestsEffectTemporary])
    ],
    providers:[
        MovementRequestsServiceTemporary,
        MovementRequestsFacadeTemporary
    ]
})

export class TemporaryRequestStateModule {}
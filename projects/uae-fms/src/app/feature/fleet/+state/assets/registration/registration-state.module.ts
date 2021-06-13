import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { RegistrationEffects } from "./registration.effects";
import * as registrationReducer from './registration.reducer';
import {RegistrationService , RegistrationFacade} from './index';
import { FLEET_REGISTRATION_FEATURE_KEY } from "./registration.entity";

@NgModule({
    imports:[
        StoreModule.forFeature(FLEET_REGISTRATION_FEATURE_KEY , registrationReducer.reducer),
        EffectsModule.forFeature([RegistrationEffects])
    ],
    providers:[
        RegistrationService,
        RegistrationFacade
    ]
})

export class RegistrationStateModule {}
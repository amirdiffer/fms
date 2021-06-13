import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { FLEET_ORGANIZATION_FEATURE_KEY } from "./organization.entity";
import * as organizationReducer from './organization.reducer';
import {OrganizationEffects} from './organization-effects.service';
import {OrganizationFacade , OrganizationService} from './index'
@NgModule({
    imports:[
        StoreModule.forFeature(FLEET_ORGANIZATION_FEATURE_KEY , organizationReducer.reducer),
        EffectsModule.forFeature([OrganizationEffects])
    ],
    providers:[
        OrganizationFacade,
        OrganizationService
    ]
})

export class OrganizationStateModule {}
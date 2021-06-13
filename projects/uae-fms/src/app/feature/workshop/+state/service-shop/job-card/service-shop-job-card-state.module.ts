import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import * as serviceShopJobCardReducer from "./service-shop-job-card.reducer"
import {ServiceShopJobCardService , ServiceShopJobCardFacade} from "./index"
import { WORKSHOP_SERVICESHOP_JOBCARD_FEATURE_KEY } from "./service-shop-job-card.entity";
import { ServiceShopJobCardEffect } from "./service-shop-job-card.effect";

@NgModule({
    imports :[
        StoreModule.forFeature(WORKSHOP_SERVICESHOP_JOBCARD_FEATURE_KEY , serviceShopJobCardReducer.reducer),
        EffectsModule.forFeature([ServiceShopJobCardEffect])
    ],
    providers:[
        ServiceShopJobCardService,
        ServiceShopJobCardFacade
    ]

})


export class ServiceShopJobCardStateModule {}

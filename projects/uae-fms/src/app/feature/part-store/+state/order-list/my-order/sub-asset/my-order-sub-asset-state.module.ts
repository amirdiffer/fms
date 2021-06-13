import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MyOrderSubAssetEffects } from "./my-order-sub-asset.effects";
import * as myOrderSubAssetReducer from "./my-order-sub-asset.reducer"
import {MyOrderSubAssetService , MyOrderSubAssetFacade} from "./index"
import { PARTSTORE_MY_ORDER_SUB_ASSET_LIST_FEATURE_KEY } from "./my-order-sub-asset.entity";

@NgModule({
    imports :[
        StoreModule.forFeature(PARTSTORE_MY_ORDER_SUB_ASSET_LIST_FEATURE_KEY , myOrderSubAssetReducer.reducer),
        EffectsModule.forFeature([MyOrderSubAssetEffects])
    ],
    providers:[
        MyOrderSubAssetService,
        MyOrderSubAssetFacade
    ]

})


export class MyOrderSubAssetStateModule {}

import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SuppliersEffects } from "./suppliers.effects";
import * as supplierReducer from "./suppliers.reducer"
import {SuppliersFacade , SuppliersService} from "./index"
import { PARTSTORE_SUPPLIERS_LIST_FEATURE_KEY } from "./suppliers.entity";

@NgModule({
    imports :[
        StoreModule.forFeature(PARTSTORE_SUPPLIERS_LIST_FEATURE_KEY , supplierReducer.reducer),
        EffectsModule.forFeature([SuppliersEffects])
    ],
    providers:[
        SuppliersFacade,
        SuppliersService
    ]

})


export class SupplierStateModule {}

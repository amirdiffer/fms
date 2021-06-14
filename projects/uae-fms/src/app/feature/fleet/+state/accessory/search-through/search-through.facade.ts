import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AccessorySearchThroughActions } from "./search-through.action";
import { IAccessorySearchThroughState } from "./search-through.entity";
import { AccessorySearchThroughSelectors } from "./search-through.selectors";


@Injectable()
export class AccessorySearchThroughFacade {
    constructor(private store: Store<IAccessorySearchThroughState>) {}

    searchAccessory$ = this.store.pipe(select(AccessorySearchThroughSelectors.selectAll));

    error$ = this.store.pipe(select(AccessorySearchThroughSelectors.error));

    loaded$ = this.store.pipe(select(AccessorySearchThroughSelectors.loaded));


    loadAvailableAccessory(){
        this.store.dispatch(AccessorySearchThroughActions.loadAvailableAccessory());
    }

}

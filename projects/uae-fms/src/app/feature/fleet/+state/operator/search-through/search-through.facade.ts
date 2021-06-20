import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { OperatorSearchThroughActions } from "./search-through.action";
import { IOperatorSearchThroughState } from "./search-through.entity";
import { OperatorSearchThroughSelectors } from "./search-through.selectors";


@Injectable()
export class OperatorSearchThroughFacade {
    constructor(private store: Store<IOperatorSearchThroughState>) {}

    searchOperator$ = this.store.pipe(select(OperatorSearchThroughSelectors.selectAll));

    error$ = this.store.pipe(select(OperatorSearchThroughSelectors.error));

    loaded$ = this.store.pipe(select(OperatorSearchThroughSelectors.loaded));


    loadOperatorAccessory(){
        this.store.dispatch(OperatorSearchThroughActions.loadAvailableOperatorUser());
    }

}

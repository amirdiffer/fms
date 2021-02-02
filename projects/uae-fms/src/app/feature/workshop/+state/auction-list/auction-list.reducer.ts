
import { Action, createReducer, on } from "@ngrx/store";
import { AuctionListActions } from "./auction-list.actions";
import { auctionListAdapter , initialState , IAuctionListState} from "./auction-list.entity"

const auctionListReducer = createReducer(
    initialState,
    on(
        AuctionListActions.loadAll,
        (state) => ({ ...state, loaded: false, error: null, message: null })
    ),
    on(
        AuctionListActions.allDataLoaded,
        (state, { data }) => (auctionListAdapter.setAll(data, { ...state, loaded: true, error: null }))
    ),
    on(
        AuctionListActions.error,
        (state, { reason }) => ({ ...state, error: reason, loaded: true })
    ), 
)

export function reducer(state: IAuctionListState, action: Action) {
    return auctionListReducer(state, action);
}
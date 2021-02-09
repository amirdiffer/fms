import { Injectable } from "@angular/core";
import { Store} from "@ngrx/store";
import { UserPorfileAction } from "./user.action";
import { UserProfileSelector } from "./user.selectors";

@Injectable()
export class UserProfileFacade {
    constructor(private _store: Store){}

    loadAll() {
        this._store.dispatch(UserPorfileAction.loadData());
    }

    loadData$ = this._store.select(UserProfileSelector.user)
}
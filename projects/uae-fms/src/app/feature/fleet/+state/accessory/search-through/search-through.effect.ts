import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Store } from "@ngrx/store";
import { AccessorySearchThroughService } from "./search-through.service";
import { AccessorySearchThroughActions } from "./search-through.action"
@Injectable()
export class AccessorySearchThroughEffects {
    constructor(
        private action$: Actions,
        private service: AccessorySearchThroughService,
        private _store: Store
    ) {}

    loadAvailableAccessory$ = createEffect(() =>
        this.action$.pipe(ofType(AccessorySearchThroughActions.loadAvailableAccessory),
        mergeMap((action) =>
            this.service.loadAvailableAccessory().pipe(
                map((data) => {
                    return AccessorySearchThroughActions.allAvailableAccessoryLoaded({ data: data.message });
                }),
                catchError((error) =>
                    of(AccessorySearchThroughActions.error({ reason: error }))
                )
            )
        )
        )
    );
}
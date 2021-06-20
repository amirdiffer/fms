import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Store } from "@ngrx/store";
import { OperatorSearchThroughService } from "./search-through.service";
import { OperatorSearchThroughActions } from "./search-through.action"
@Injectable()
export class OperatorSearchThroughEffects {
    constructor(
        private action$: Actions,
        private service: OperatorSearchThroughService,
        private _store: Store
    ) {}

    loadAvailableOperator$ = createEffect(() =>
        this.action$.pipe(ofType(OperatorSearchThroughActions.loadAvailableOperatorUser),
        mergeMap((action) =>
            this.service.loadAvailableOperator().pipe(
                map((data) => {
                    return OperatorSearchThroughActions.allAvailableOperatorUserLoaded({ data: data.message });
                }),
                catchError((error) =>
                    of(OperatorSearchThroughActions.error({ reason: error }))
                )
            )
        )
        )
    );
}
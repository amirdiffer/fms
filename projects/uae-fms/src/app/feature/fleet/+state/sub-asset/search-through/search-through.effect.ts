import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { SubAssetSearchThroughService } from "./search-through.service";
import { SubAssetSearchThroughActions } from "./search-through.action"
@Injectable()
export class SubAssetSearchThroughEffects {
    constructor(
        private action$: Actions,
        private service: SubAssetSearchThroughService,
    ) {}

    loadAvailableAccessory$ = createEffect(() =>
        this.action$.pipe(ofType(SubAssetSearchThroughActions.loadAvailableSubAssetWithModelId),
        mergeMap((action) =>
            this.service.loadAvailableSubAssetWithModelId(action.id).pipe(
                map((data) => {
                    return SubAssetSearchThroughActions.allAvailableSubAssetWithModelIdLoaded({ data: data.message });
                }),
                catchError((error) =>
                    of(SubAssetSearchThroughActions.error({ reason: error }))
                )
            )
        )
        )
    );
}
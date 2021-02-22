import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubAssetActions } from './sub-asset.actions';
import { SubAssetService } from './sub-asset.service';

@Injectable()
export class SubAssetEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(SubAssetActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => SubAssetActions.allDataLoaded({ data })),
          catchError((error) => of(SubAssetActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: SubAssetService) {}
}
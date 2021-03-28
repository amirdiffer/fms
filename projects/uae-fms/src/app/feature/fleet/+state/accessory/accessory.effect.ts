import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AccessoryActions } from './accessory.actions';
import { AccessoryService } from './accessory.service';

@Injectable()
export class AccessoryEffect {
  LoadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(AccessoryActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => AccessoryActions.allDataLoaded({ data })),
          catchError((error) => of(AccessoryActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: AccessoryService) {}
}

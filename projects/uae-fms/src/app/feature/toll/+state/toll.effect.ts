import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TollActions } from './toll.actions';
import { TollService } from './toll.service';

@Injectable()
export class TollEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(TollActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => TollActions.allDataLoaded({ data })),
          catchError((error) => of(TollActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: TollService) {}
}

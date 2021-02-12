import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PartListService } from './part-list.service';
import { PartListActions } from './part-list.actions';

@Injectable()
export class PartListEffect {
  constructor(private action$: Actions, private service: PartListService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartListActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return PartListActions.allDataLoaded({ data });
          }),
          catchError((error) => of(PartListActions.error({ reason: error })))
        )
      )
    )
  );
}

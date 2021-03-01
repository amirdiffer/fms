import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OwnershipActions } from './ownership.actions';
import { OwnershipService } from './ownership.service';

@Injectable()
export class OwnershipEffect {
  fakeData= [{
    id: 1,
    name: 'morteza'
  },{
    id: 2,
    name: 'ali'
  }];
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(OwnershipActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => OwnershipActions.allDataLoaded({ data: this.fakeData })),
          catchError((error) => of(OwnershipActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: OwnershipService) {}
}

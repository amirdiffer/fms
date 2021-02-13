import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PartMasterActions } from './part-master.actions';
import { PartMasterService } from './part-master.service';

@Injectable()
export class PartMasterEffect {
  constructor(private action$: Actions, private service: PartMasterService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return PartMasterActions.allDataLoaded({ data });
          }),
          catchError((error) => of(PartMasterActions.error({ reason: error })))
        )
      )
    )
  );
}

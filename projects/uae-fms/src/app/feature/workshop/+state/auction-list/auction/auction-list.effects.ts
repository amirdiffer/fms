import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuctionListActions } from './auction-list.actions';
import { AuctionListService } from './auction-list.service';

@Injectable()
export class AuctionListEffect {
  constructor(private action$: Actions, private service: AuctionListService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuctionListActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return AuctionListActions.allDataLoaded({ data });
          }),
          catchError((error) => of(AuctionListActions.error({ reason: error })))
        )
      )
    )
  );
}

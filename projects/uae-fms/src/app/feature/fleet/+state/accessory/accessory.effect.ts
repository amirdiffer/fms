import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AccessoryActions } from './accessory.actions';
import { AccessoryService } from './accessory.service';


@Injectable()
export class AccessoryEffect {
  mockData = [
    {
      id: 1,
      itemName: "Item Name 1",
      assignedToType: "123",
      assignedToEntity: 123,
      accessoryTypeId: 123,
      quantity: 123,
      assignedToEmployeeId: 123
    },
    {
      id: 2,
      itemName: "Item Name 2",
      assignedToType: "123",
      assignedToEntity: 123,
      accessoryTypeId: 123,
      quantity: 123,
      assignedToEmployeeId: 123
    }
  ];
  LoadAll$ = createEffect(() =>
    this.action$.pipe(
        ofType(AccessoryActions.loadAll),
        mergeMap((action) =>
            this.service.loadAll().pipe(
                map((data) => AccessoryActions.allDataLoaded({ data: this.mockData })),
                catchError((error) =>
                    of(AccessoryActions.error({ reason: error }))
                 )
            )
        )
    )
  );

  constructor(
    private action$: Actions,
    private service: AccessoryService
  ) {}
}

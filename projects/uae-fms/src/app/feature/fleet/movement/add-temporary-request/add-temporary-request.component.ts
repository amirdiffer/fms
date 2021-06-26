import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utility } from '@shared/utility/utility';

import { MovementService } from '@feature/fleet/movement/movement.service';
import { MovementRequestsFacadeTemporary } from '@feature/fleet/+state/movement/temporary/requests/movement-requests.facade';
import { MovementOverviewFacadeTemporary } from '@feature/fleet/+state/movement/temporary/overview/movement-overview.facade';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master';
import { DialogService } from '@core/dialog/dialog-template.component';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-add-request',
  templateUrl: './add-temporary-request.component.html',
  styleUrls: ['./add-temporary-request.component.scss']
})
export class AddTemporaryRequestComponent extends Utility implements OnInit {
  requestForm: FormGroup;
  submitted = false;
  calenderIcon = 'assets/icons/calendar-alt-regular.svg';
  assetTypes = [];
  oldAssetSuggests = [];
  oldAssetSuggestsB;

  constructor(
    private _fb: FormBuilder,
    private facade: MovementRequestsFacadeTemporary,
    private overViewFacade: MovementOverviewFacadeTemporary,
    private assetFacade: AssetMasterFacade,
    private _movementService: MovementService,
    private _dialogService : DialogService,
    injector: Injector
  ) {
    super(injector);
    this.facade.reset();
  }

  ngOnInit(): void {
    this.assetFacade.loadAll();
    this.requestForm = this._fb.group({
      requestType: ['NEW'],
      assetType: [null, Validators.compose([Validators.required])],
      reason: ['', Validators.compose([Validators.required])],
      // quality: [''],
      oldAssetId: [''],
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])]
    });
    this.facade.submitted$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('success' , 
          'Add New Request', 
          'Request Added Successfully','Ok')
          const dialogClose$:Subscription = dialog.dialogClosed$
          .pipe(
            tap((result) => {
            if (result === 'confirm') {
              this.router.navigate(['/fleet/movement/temporary']).then(()=>{
                this.facade.loadAll();
                this.overViewFacade.loadAll();
              });
            }
            dialogClose$?.unsubscribe();
            })
          ).subscribe()
      }
    });

    this.assetFacade.assetMaster$.subscribe((x) => {
      this.oldAssetSuggestsB = x.map((y) => ({
        id: y.id,
        name: y['makeName'] + ' ' + y['modelName']
      }));
    });

    this._movementService.assetTypes().subscribe((x) => {
      this.assetTypes = x.message.map((y) => ({ id: y.id, name: y['name'] }));
      if (this.assetTypes.length)
        this.requestForm.get('assetType').patchValue(this.assetTypes[0]);
    });

    this.facade.error$.subscribe((x) => {
      if (x?.error) {
        const dialog = this._dialogService.show('danger' , 
        'Add Request', 
        'We Have Some Error','Ok')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
          }
          dialogClose$?.unsubscribe();
          })
        ).subscribe()
      }
    });
  }

  filterAssets(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.oldAssetSuggests = this.oldAssetSuggestsB.filter(
      (x) =>
        (x.id + '').indexOf(event.query) >= 0 ||
        x.name.indexOf(event.query) >= 0
    );
  }

  submit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    } else {
      const dialog = this._dialogService.show('warning' , 
      'Add New Request',
      'Are you sure you want to add new request?' , 'Yes','Cancel')
      const dialogClose$:Subscription = dialog.dialogClosed$
      .pipe(
        tap((result) => {
        if (result === 'confirm') {
          let d = this.requestForm.getRawValue();
          let _data = {
            requesterId: 1,
            requestType: d.requestType,
            movementType: 'TEMPORARY',
            assetConfigurationId: d.assetType.id,
            reason: d.reason,
            quantity: 1,
            oldAssetId: d.oldAssetId.id,
            startDate: d.startDate,
            endDate: d.endDate
          };
          if (_data.requestType == 'NEW') _data.oldAssetId = undefined;
          else _data.quantity = undefined;
          this.facade.addMovementRequest(_data);
        }
        dialogClose$?.unsubscribe();
      })
    ).subscribe();
   
     
    }
  }
  showCancelAlert() {
    const dialog = this._dialogService.show('warning' , 'Are you sure you want to leave?' , 'You have unsaved changes! If you leave, your changes will be lost.' , 'Yes','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
    .pipe(
      tap((result) => {
      if (result === 'confirm') {
        this.router.navigate(['/fleet/movement/temporary'])
      }
      dialogClose$?.unsubscribe();
      })
    ).subscribe();
  }

}

import { Component, OnInit, Inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { Utility } from '@shared/utility/utility';
import { OperatorFacade } from '@feature/fleet/+state/operator';
import { OrganizationFacade } from '@feature/fleet/+state/organization';
import { MovementService } from '@feature/fleet/movement/movement.service';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master';
import { MovementRequestsFacadeTemporary } from '@feature/fleet/+state/movement/temporary/requests';
import { DialogService } from '@core/dialog/dialog-template.component';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-movement-temporary-confirm',
  templateUrl: './movement-confirm.component.html',
  styleUrls: ['./movement-confirm.component.scss']
})
export class MovementTemporaryConfirmComponent
  extends Utility
  implements OnInit {
  confirmForm: FormGroup;
  assetSuggests = [];
  assetSuggestsB;
  operatorSuggests = [];
  operatorSuggestsB;
  organizationSuggests = [];
  organizationSuggestsB;
  submitted = false
  yearRange =`2000:${new Date().getFullYear()}`;
  constructor(
    private _fb: FormBuilder,
    private _assetFacade: AssetMasterFacade,
    private _operatorFacade: OperatorFacade,
    private _orgFacade: OrganizationFacade,
    private _requestFacade: MovementRequestsFacadeTemporary,
    private _movementService: MovementService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MovementTemporaryConfirmComponent>,
    private _dialogService : DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    injector: Injector
  ) {
    super(injector);
    this._requestFacade.reset()
  }

  ngOnInit(): void {
    this.confirmForm = this._fb.group({
      asset: ['', Validators.compose([Validators.required])],
      department: ['', Validators.compose([Validators.required])],
      operator: ['', Validators.compose([Validators.required])],
      comment: ['', Validators.compose([Validators.required])],
      movementType: ['temporary'],
      startDate: [''],
      startTime: [''],
      endDate: [''],
      endTime: [''],
      gps: ['', Validators.compose([Validators.required])],
      sendNotification: [true],
      fuelCart: [true],
      serialNumber: ['', Validators.compose([Validators.required])]
    });
    this._assetFacade.loadAll();
    this._assetFacade.assetMaster$.subscribe((x) => {
      this.assetSuggestsB = x.map((y) => ({
        id: y.id,
        name: y.dpd
      }));
    });

    this._orgFacade.loadAll();
    this._orgFacade.organization$.subscribe((x) => {
      this.organizationSuggestsB = x.map((y) => ({
        id: y.id,
        name: y['organizationName']
      }));
    });

    this._movementService.operators().subscribe((x) => {
      let operator: Array<any> = x.message;
      this.operatorSuggestsB = operator.map((y) => ({
        id: y.id,
        name: y['firstName'] + ' ' + y['lastName']
      }));
    });

    this._requestFacade.assigned$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('success' , 
        'Assign Request', 
        'Request Assigned Successfully','Ok')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
            this.router.navigate(['/fleet/movement/temporary'] , {queryParams:{id:'requestTab'}}).then(()=>{
              this._requestFacade.loadAll()
            });
          }
          dialogClose$?.unsubscribe();
          })
        ).subscribe()
      }
    });

    this._requestFacade.error$.subscribe((x) => {
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
    this.assetSuggests = this.assetSuggestsB.filter(
      (x) =>
        (x.id + '').indexOf(event.query) >= 0 ||
        x.name.toLocaleLowerCase().indexOf(event.query.toLocaleLowerCase()) >= 0
    );
  }

  filterOperators(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.operatorSuggests = this.operatorSuggestsB.filter(
      (x) =>
        (x.id + '').indexOf(event.query) >= 0 ||
        x.name.toLocaleLowerCase().indexOf(event.query.toLocaleLowerCase()) >= 0
    );
  }

  filterOrganizations(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.organizationSuggests = this.organizationSuggestsB.filter(
      (x) =>
        (x.id + '').indexOf(event.query) >= 0 ||
        x.name.toLocaleLowerCase().indexOf(event.query.toLocaleLowerCase()) >= 0
    );
  }

  submit(): void {
    this.submitted = true;
    this.confirmForm.get('department').markAsDirty();
    this.confirmForm.get('operator').markAsDirty();
    this.confirmForm.get('comment').markAsDirty();
    this.confirmForm.get('gps').markAsDirty();
    this.confirmForm.get('serialNumber').markAsDirty();
    if (this.confirmForm.invalid) {
      return;
    }
    const dialog = this._dialogService.show('warning' , 
    'Assign Request',
    'Are you sure you want to assign new request?' , 'Yes','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
    .pipe(
      tap((result) => {
      if (result === 'confirm') {
        let d = this.confirmForm.getRawValue();
        let _data = {
          assetId: d.asset.id,
          operatorId: d.operator.id,
          organizationId: d.department.id,
          departmentId: d.department.id,
          comment: d.comment,
          gpsMeterSource: d.gps,
          shouldSendNotification: d.sendNotification,
          hasFuelCard: d.fuelCart,
          fuelCardSerialNumber: d.serialNumber
        };
        this._requestFacade.assigning(this.data, _data);
      }
      dialogClose$?.unsubscribe();
    })
  ).subscribe();
  }

}

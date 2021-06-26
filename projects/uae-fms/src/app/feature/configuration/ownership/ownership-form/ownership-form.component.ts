import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';
import { map } from 'rxjs/operators';
import { OwnershipFacade, OwnershipService } from '../../+state/ownership';
import { DialogService } from '@core/dialog/dialog-template.component';

@Component({
  selector: 'anms-ownership-form',
  templateUrl: './ownership-form.component.html',
  styleUrls: ['./ownership-form.component.scss']
})
export class OwnershipFormComponent extends Utility implements OnInit {
  isEdit = false;
  id;

  //#region Table
  ownerShip_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.ownership', type: 1, field: 'Ownership' },
      { lable: 'tables.column.Owner', type: 1, field: 'Owner' },
      { lable: 'tables.column.fleet_it_code', type: 1, field: 'Fleet_IT_Code' },
      {
        lable: 'tables.column.duration',
        type: 1,
        field: 'Duration',
        sortable: true
      },
      { lable: 'tables.column.purpose', type: 1, field: 'Purpose' },
      { lable: 'tables.column.owner_email', type: 1, field: 'Owner_Email' },
      {
        lable: 'tables.column.owner_phone_no',
        type: 1,
        field: 'Owner_Phone_No'
      },
      {
        lable: '<img src="../../../../assets/icons/car-solid.svg">',
        type: 1,
        isIconLable: true,
        field: 'car',
        width: 100,
        sortable: true
      }
    ],
    data: []
  };

  ownerShip$ = this.facade.ownership$.pipe(
    map((x) =>
      x.map((item) => {
        return {
          Ownership: item.type,
          Owner: item.name,
          Fleet_IT_Code: item.fleetITCode,
          Duration: item.duration,
          Purpose: item.purpose,
          Owner_Email: item.email,
          Owner_Phone_No: item.phoneNumber,
          car: item.numOfOwnedAssets || 0
        };
      })
    )
  );
  //#endregion

  //#region  Variables
  ownerShipForm: FormGroup;
  submitted = false;
  //#endregion

  get ownershipType(): OwnershipType {
    return this.ownerShipForm.controls['type'].value;
  }

  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private facade: OwnershipFacade,
    private service: OwnershipService,
    public route: ActivatedRoute,
    private dialogService: DialogService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.facade.loadAll();

    this.ownerShipForm = this._fb.group({
      type: ['EXTERNAL'],
      purpose: [''],
      fleetITCode: ['', [Validators.required]],
      duration: []
    });

    this.facade.submitted$.subscribe((x) => {
      if (x) {
        const dialog = this.dialogService.show('success', 'Success',
          this.isEdit ? 'Ownership Edited Successfully' : 'New ownership Successfully Added',
          'Ok', '')
        dialog.dialogClosed$.subscribe(result => {
          if (result === 'confirm') {
            this.resetParams();
            this._goToList();
          }
        });
      }
    });

    this.facade.error$.subscribe((x) => {
      if (x?.error) {
        const dialog = this.dialogService.show('danger', 'Error', 'Some Error Occurred',
          'Ok', '')
        dialog.dialogClosed$.subscribe(result => {
          if (result === 'confirm') {
          } else {
          }
        });
      }
    });

    this.route.params.subscribe((z) => {
      if (!z?.id) return;
      this.isEdit = true;
      this.id = z.id;
      this.service.getByID(z.id).subscribe((q) => {
        const res: any = q.message;

        this.ownerShipForm.patchValue({
          type: res.type,
          name: res.name,
          email: res.email,
          phoneNumber: res.phoneNumber,
          purpose: res.purpose,
          fleetITCode: res.fleetITCode,
          duration: res.duration
        });
      });
    });
  }
  submit() {
    this.submitted = true;
    if (this.ownerShipForm.invalid) {
      return;
    } else {
      const payload = {
        duration:
          this.ownershipType === 'EXTERNAL' || this.ownershipType === 'OWNED'
            ? '1'
            : this.ownerShipForm.value.duration,
        fleetITCode: this.ownerShipForm.value.fleetITCode,
        purpose: this.ownerShipForm.value.purpose,
        type: this.ownerShipForm.value.type
      };
      if (this.isEdit) {
        this.facade.editOwnership({ ...payload, id: this.id });
      } else {
        this.facade.addOwnership(payload);
      }
    }
  }
  showCancelAlert() {
    const dialog = this.dialogService.show('warning', 'Cancel',
      'Are you sure you want to cancel ?', 'Yes', 'No');
    dialog.dialogClosed$.subscribe(result => {
      if (result === 'confirm') {
        this._goToList();
      }
    });
  }

  resetParams(): void {
    this.facade.resetParams();
  }

  _goToList() {
    this.router.navigate(['configuration/ownership']);
  }
}

export type OwnershipType = 'EXTERNAL' | 'OWNED' | 'RENT' | 'DEMO';

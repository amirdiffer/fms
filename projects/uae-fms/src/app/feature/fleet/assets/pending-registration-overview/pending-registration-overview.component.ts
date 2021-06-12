import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { RegistrationFacade, RegistrationService } from '@feature/fleet/+state/assets/registration';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'anms-pending-registration-overview',
  templateUrl: './pending-registration-overview.component.html',
  styleUrls: ['./pending-registration-overview.component.scss']
})
export class PendingRegistrationOverviewComponent
  extends Utility
  implements OnInit {
  salikTags: any[] = [
    { name: 'Item No 234567890', gps: '456783234658' },
    { name: 'Item No 234567891', gps: '666663345435' },
    { name: 'Item No 234567892', gps: '567434234244' },
    { name: 'Item No 234567893', gps: '541565456465' },
    { name: 'Item No 234567894', gps: '489456141856' }
  ];
  filteredSalikTag: any[];
  fuelTags: any[] = [
    { name: 'Item No 234567890', gps: '456783234658' },
    { name: 'Item No 234567891', gps: '666663345435' },
    { name: 'Item No 234567892', gps: '567434234244' },
    { name: 'Item No 234567893', gps: '541565456465' },
    { name: 'Item No 234567894', gps: '489456141856' }
  ];
  filteredFuelTag: any[];
  inputForm: FormGroup;
  submitted = false;
  // displayModal = false;
  // dialogSetting: IDialogAlert = {
  //   header: 'Asset Successfully Registered',
  //   hasError: false,
  //   message: 'Sample hint is here to explain process',
  //   confirmButton: 'Customize Now',
  //   buttons: [
  //     {
  //       title: 'Customize Later',
  //       eventEmit: 'customizeLater'
  //     }
  //   ],
  //   cancelButton: 'Cancel'
  // };
  //#region Dialog
  dialogModal = false;
  taskFiltered: any[];
  dialogSetting: IDialogAlert = {
    header: 'Add Registration',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };
  errorDialogSetting: IDialogAlert = {
    header: '',
    message: 'Error occurred in progress',
    confirmButton: 'Ok',
    isWarning: false,
    hasError: true,
    hasHeader: true,
    cancelButton: undefined
  };
  dialogType = null;
  //#endregion Dialog
  errorDialogModal = false;
  isEdit: boolean = false;
  id: any;
  _registration: any;
  assetId: number;
  assetSummary: any;

  constructor(
    private dialog: MatDialog,
    private _fb: FormBuilder,
    injector: Injector,
    private _registrationFacade: RegistrationFacade,
    private _registrationService: RegistrationService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      plateNumber: [''],
      insuranceNumber: [''],
      salikTag: [''],
      fuelTag: [''],
      operator: [''],
      department: [''],
      employeeNumber: [''],
      currentLiveReading: ['']
    });
    this.route.params.subscribe((params) => {
      this.assetId = +params['id'];
      this._registrationFacade.getAssetForRegistration(this.assetId);
      this._registrationFacade.assetForRegistration$.subscribe((x) => {
        this.assetSummary = x;
      });
      // if (this.isEdit) {
      //   this.id = +params[params.length - 1].path;
      //   this._registrationService
      //     .getRegistrationById(params[params.length - 1].path)
      //     .pipe(map((x) => x.message))
      //     .subscribe((x) => {
      //       if (x) {
      //         this._registration = x;
      //         this.inputForm.patchValue({
      //           plateNumber: x.plateNumber,
      //           insuranceNumber: x.insuranceNumber
      //         });
      //       }
      //     });
      // }
      // else {
      // }
      this._registrationFacade.submitted$.subscribe((x) => {
        if (x) {
          this.dialogModal = true;
          this.dialogType = 'success';
          this.dialogSetting.header = this.isEdit
            ? 'Edit registration'
            : 'Add new registration';
          this.dialogSetting.message = this.isEdit
            ? 'Changes Saved Successfully'
            : 'Registration Added Successfully';
          this.dialogSetting.isWarning = false;
          this.dialogSetting.hasError = false;
          this.dialogSetting.confirmButton = undefined;
          this.dialogSetting.buttons = [
            { title: "Customize Now", eventEmit: "now" },
            { title: "Customize Later", eventEmit: "later" }
          ];

          this.dialogSetting.cancelButton = undefined;
          this._registrationFacade.loadAll();
        }
      });

      this._registrationFacade.error$.subscribe((x) => {
        if (x?.error) {
          this.errorDialogModal = true;
          this.errorDialogSetting.header = this.isEdit
            ? 'Edit registration'
            : 'Add new registration';
          this.errorDialogSetting.hasError = true;
          this.errorDialogSetting.cancelButton = undefined;
          this.errorDialogSetting.confirmButton = 'Ok';
        } else {
          this.errorDialogModal = false;
        }
      });
    });
  }
  searchSalikTag(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.salikTags.length; i++) {
      let salikTag = this.salikTags[i];
      if (salikTag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(salikTag);
      }
    }
    this.filteredSalikTag = filtered;
  }
  searchFuelTag(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.fuelTags.length; i++) {
      let fuelTag = this.fuelTags[i];
      if (fuelTag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(fuelTag);
      }
    }
    this.filteredFuelTag = filtered;
  }

  dialogConfirm($event): void {
    this.errorDialogModal = false;
    this.dialogModal = false;
    if (!$event) return;
    if ($event == "now") {
      this.dialogModal = false;
      this._registrationFacade.resetParams();
      this.router.navigate(['/fleet/assets/' + this.assetId + '/customization']);
      return;
    }
    if ($event == "later") {
      this.dialogModal = false;
      this._registrationFacade.resetParams();
      this.router.navigate(['/fleet/assets']);
      return;
    }

    if (this.dialogType == 'submit') {
      let f = this.inputForm.value;

      let registrationInfo: any = {
        plateNumber: f.plateNumber,
        insuranceNumber: f.insuranceNumber,
        fuelTag: '2l1k34jl' //f.fuelTag,
      };

      if (this.isEdit) {
        // registrationInfo = {
        //   ...registrationInfo,
        //   id: this.id
        // };
        // this._registrationFacade.editRegistration(registrationInfo);
      } else {
        registrationInfo = {
          ...registrationInfo,
          id: this.assetId
        };

        this._registrationFacade.register(registrationInfo);
      }
    } else {
      this.router
        .navigate(['/fleet/assets'], {
          queryParams: { id: 'pendingRegistrationTab' }
        })
        .then((_) => {
          this._registrationFacade.resetParams();
        });
    }
  }

  addRegistration() {
    this.submitted = true;
    if (this.inputForm.invalid) {
      this.inputForm.markAllAsTouched();
      return;
    }

    this.dialogModal = true;
    this.dialogType = 'submit';
    if (this.isEdit) {
      this.dialogSetting.header = 'Edit registration';
      this.dialogSetting.message =
        'Are you sure you want to submit this changes?';
      this.dialogSetting.isWarning = true;
      this.dialogSetting.confirmButton = 'Yes';
      this.dialogSetting.cancelButton = 'Cancel';
      return;
    } else {
      this.dialogSetting.header = 'Add new registration';
      this.dialogSetting.isWarning = true;
      this.dialogSetting.hasError = false;
      this.dialogSetting.message =
        'Are you sure you want to add new registration?';
      this.dialogSetting.confirmButton = 'OK';
      this.dialogSetting.cancelButton = 'Cancel';
    }
  }

  public get language(): string {
    return localStorage.getItem('lang');
  }

  cancelForm() {
    this.dialogModal = true;
    this.dialogType = 'cancel';
    if (this.isEdit) {
      this.dialogSetting.header = 'Edit registration';
      this.dialogSetting.hasError = false;
      this.dialogSetting.isWarning = true;
      this.dialogSetting.message =
        'Are you sure that you want to cancel editing registration?';
      this.dialogSetting.confirmButton = 'Yes';
      this.dialogSetting.cancelButton = 'Cancel';
    }

    this.dialogSetting.header = 'Add new registration';
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message =
      'Are you sure that you want to cancel adding new registration?';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'Cancel';
  }
}

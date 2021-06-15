import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { RegistrationFacade, RegistrationService } from '@feature/fleet/+state/assets/registration';
import { TrafficFineTableFacade } from '@feature/traffic-fine/+state/traffic-fine';
import { ITrafficFineVehicleInfo, ITrafficFineVehicleInfoVehicleInfo, ITrafficFineVehicleInfoVehicleReturn } from '@models/pending-registration.model';
import { Utility } from '@shared/utility/utility';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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

  /* Input Value */
  plateCategory : any[] =  [
    {name:"Duabi Police" , value : 19 , label:"dubaiPolice"},
    {name:"Private" , value : 2 , label:"private"},
  ];

  plateCodePrivate: any[] = [
    {name:"A" , value : 2},
    {name:"AA" , value : ''},
    {name:"B" , value : 3},
    {name:"C" , value : 4},
    {name:"D" , value : 5},
    {name:"E" , value : 6},
    {name:"F" , value : 7},
    {name:"G" , value : 68},
    {name:"H" , value : 70},
    {name:"I" , value : 71},
    {name:"J" , value : 78},
    {name:"K" , value : 80},
    {name:"L" , value : 74},
    {name:"M" , value : 69},
    {name:"N" , value : 95},
    {name:"O" , value : 88},
    {name:"P" , value : 96},
    {name:"Q" , value : 93},
    {name:"R" , value : 79},
    {name:"S" , value : 87},
    {name:"T" , value : 97},
    {name:"U" , value : 98},
    {name:"V" , value : 86},
    {name:"W" , value : 99},
    {name:"White" , value : 34},
    {name:"X" , value : 100},
    {name:"Y" , value : 102},
    {name:"Z" , value : 101},
  ];

  plateCodeDubaiPolice : any [] = [
    {name:"Duabi Police" , value : 150}
  ];

  plateCode$ : Observable<any> = of(this.plateCodeDubaiPolice);

  plateSource :any[]=[
    {name:"Duabi Police" , value : "DXB"},
  ];

  loadVehicleInfo:boolean = false;
  vehicleInfo$:Observable<ITrafficFineVehicleInfo>;

  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private _registrationFacade: RegistrationFacade,
    private _trafficFineFacade : TrafficFineTableFacade
  ) {
    super(injector);
    this._trafficFineFacade.reset();
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      registerType:['plate_number'],
      plateCategory:[{name:"Duabi Police" , value : 19 , label:"dubaiPolice"}, [Validators.required]],
      plateCode:[150 , [Validators.required]],
      plateNumber: ['', [Validators.required]],
      plateSource:['DXB'],
      chassisNumber:[''],
      salikTag: [''],
      fuelTag: [''],
    });
    this.inputForm.get('registerType').valueChanges.subscribe(x => {
      if(x){
        switch (x) {
          case 'plate_number':
            console.log(x)
            this.inputForm.get('chassisNumber').clearValidators();
            this.inputForm.get('plateCategory').setValidators([Validators.required]);
            this.inputForm.get('plateCode').setValidators([Validators.required]);
            this.inputForm.get('plateNumber').setValidators([Validators.required]);
            break;
          case 'chassis':
            this.inputForm.get('chassisNumber').setValidators([Validators.required]);
            this.inputForm.get('plateCategory').clearValidators();
            this.inputForm.get('plateCode').clearValidators();
            this.inputForm.get('plateNumber').clearValidators();
            break;
        }
        this.inputForm.get('chassisNumber').updateValueAndValidity();
        this.inputForm.get('plateCategory').updateValueAndValidity();
        this.inputForm.get('plateCode').updateValueAndValidity();
        this.inputForm.get('plateNumber').updateValueAndValidity();
      }
    })

    this.vehicleInfo$ = this._trafficFineFacade.vehicleInfo$.pipe(
      map(x => {
        if(x){
          return x
        }
      })
    )
    this._trafficFineFacade.loaded$.subscribe(x => {
      if(x){
        this.loadVehicleInfo = true;
      }else{
        this.loadVehicleInfo = false;
      }
    })

    this.route.params.subscribe((params) => {
      this.assetId = +params['id'];
      this._registrationFacade.getAssetForRegistration(this.assetId);
      this._registrationFacade.assetForRegistration$.subscribe((x) => {
        this.assetSummary = x;
      });
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
            { title: 'Customize Now', eventEmit: 'now' },
            { title: 'Customize Later', eventEmit: 'later' }
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

      this._trafficFineFacade.error$.subscribe(x => {
        if (x?.error) {
          this.errorDialogModal = true;
          this.errorDialogSetting.header = "Load Vehicle info"
          this.dialogSetting.message ="No vehicle with this specification was found"
          this.errorDialogSetting.hasError = true;
          this.errorDialogSetting.cancelButton = undefined;
          this.errorDialogSetting.confirmButton = 'Ok';
        } else {
          this.errorDialogModal = false;
        }
      })
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
    if ($event == 'now') {
      this.dialogModal = false;
      this._registrationFacade.resetParams();
      this.router.navigate([
        '/fleet/assets/' + this.assetId + '/customization'
      ]);
      return;
    }
    if ($event == 'later') {
      this.dialogModal = false;
      this._registrationFacade.resetParams();
      this.router.navigate(['/fleet/assets']);
      return;
    }

    if (this.dialogType == 'submit') {
      let formValue = this.inputForm.getRawValue();
      let registerByPlateNumberValue = {
        id:this.assetId,
        plateCategory:formValue.plateCategory.value,
        plateCode:formValue.plateCode,
        plateNumber:formValue.plateNumber,
        plateSource:formValue.plateSource,
        fuelTag:formValue.fuelTag,
        tollTag:formValue.salikTag
      }
      let registerByChassisNumberValue = {
        id:this.assetId,
        chassisNumber:formValue.chassisNumber,
        fuelTag:formValue.fuelTag,
        tollTag:formValue.salikTag
      }
      if(this.inputForm.get('registerType').value === 'plate_number'){
        console.log(registerByPlateNumberValue)
        this._registrationFacade.registerByPlateNumber(registerByPlateNumberValue)
      }else if (this.inputForm.get('registerType').value === 'chassis'){
        console.log(registerByChassisNumberValue)
        this._registrationFacade.registerByChasisNumber(registerByChassisNumberValue)
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

  plateCategoryChange(event){
    switch (event.value.label) {
      case 'private':
        this.plateCode$ = of(this.plateCodePrivate)
        break;
      case 'dubaiPolice':
        this.plateCode$ = of(this.plateCodeDubaiPolice)
        break;
    }
    this.inputForm.get('plateCode').reset()
  }

  loadVehicleInformation(){
    let formValue = this.inputForm.getRawValue();
    this.loadVehicleInfo = false;
    if(this.inputForm.get('registerType').value ==="plate_number"){
      this._trafficFineFacade.getVehicleInformationByPlateNumber({
        plateSource:formValue.plateSource,
        plateNumber:formValue.plateNumber,
        plateCode:formValue.plateCode,
        plateCategory:formValue.plateCategory.value,
      })
    }else if(this.inputForm.get('registerType').value ==="chassis"){
      this._trafficFineFacade.getVehicleInformationByChassisNumber({
        chassisNumber:formValue.chassisNumber
      })
    }
  }

  addRegistration() {
    this.submitted = true;
    if (this.inputForm.invalid) {
      this.inputForm.markAllAsTouched();
      return;
    }
    
    this.dialogType = 'submit';
    this.dialogModal = true;
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


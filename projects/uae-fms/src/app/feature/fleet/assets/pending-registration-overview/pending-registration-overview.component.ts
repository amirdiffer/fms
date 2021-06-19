import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { DialogService } from '@core/dialog/dialog-template.component';
import { RegistrationFacade, RegistrationService } from '@feature/fleet/+state/assets/registration';
import { TrafficFineTableFacade } from '@feature/traffic-fine/+state/traffic-fine';
import { ITrafficFineVehicleInfo, ITrafficFineVehicleInfoVehicleInfo, ITrafficFineVehicleInfoVehicleReturn } from '@models/pending-registration.model';
import { Utility } from '@shared/utility/utility';
import { Observable, of, Subscription } from 'rxjs';
import { map, take, takeLast, takeUntil, tap } from 'rxjs/operators';

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

  taskFiltered: any[];
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
    private _trafficFineFacade : TrafficFineTableFacade,
    private _dialogService : DialogService
  ) {
    super(injector);
    this._registrationFacade.resetParams();
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
    });

    this._registrationFacade.submitted$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('success' ,
        (this.isEdit? 'Edit registration': 'Add new registration') , 
        (this.isEdit ? 'Changes Saved Successfully': 'Registration Added Successfully') , 
        (this.isEdit ? 'Ok': 'Customize Now'),
        (this.isEdit ? undefined : 'Customize Later') 
        )
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
            if (result === 'confirm') {
              if (this.assetId > 0 && !this.isEdit) {
                this.router.navigate([
                  '/fleet/assets/' + this.assetId + '/customization'
                ]);
              }
              if(this.isEdit) {this.router.navigate(['/fleet/assets'])}
            }else{
              this.router.navigate(['/fleet/assets']);
            }
            dialogClose$?.unsubscribe();
          })
        ).subscribe();
        this._registrationFacade.resetParams();
        this._registrationFacade.loadAll();
      }
    })

    this._registrationFacade.error$.subscribe((x) => {
      if (x?.error) {
        const dialog = this._dialogService.show('danger' , (this.isEdit? 'Edit registration': 'Add new registration') , 'We have an error. Do you want continue ?', 'Yes' , 'Cancel')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
            if (result !== 'confirm') {
              this.router.navigate(['/fleet/assets']);
            }
            dialogClose$?.unsubscribe();
          })
          ).subscribe();
          this._registrationFacade.resetParams();
      }
    });

    this._trafficFineFacade.error$.subscribe(x => {
      if (x?.error) {
        const dialog = this._dialogService.show('danger' , 'Load Vehicle info' , 'No vehicle with this specification was found', 'Ok')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
            if (result === 'confirm') {
            }
            dialogClose$?.unsubscribe();
          })
        ).subscribe();
      }
    })
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

  // dialogConfirm($event): void {
  //   this.errorDialogModal = false;
  //   this.dialogModal = false;
  //   if (!$event) return;
  //   if ($event == 'now') {
  //     this.dialogModal = false;
  //     this._registrationFacade.resetParams();
  //     this.router.navigate([
  //       '/fleet/assets/' + this.assetId + '/customization'
  //     ]);
  //     return;
  //   }
  //   if ($event == 'later') {
  //     this.dialogModal = false;
  //     this._registrationFacade.resetParams();
  //     this.router.navigate(['/fleet/assets']);
  //     return;
  //   }

  //   if (this.dialogType == 'submit') {
     
  //   } else {
  //     this.router
  //       .navigate(['/fleet/assets'], {
  //         queryParams: { id: 'pendingRegistrationTab' }
  //       })
  //       .then((_) => {
  //         this._registrationFacade.resetParams();
  //       });
  //   }
  // }

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


  }

  public get language(): string {
    return localStorage.getItem('lang');
  }

  cancelForm() {
    const dialog = this._dialogService.show('warning' , 'Are you sure you want to leave?' , 'You have unsaved changes! If you leave, your changes will be lost.' , 'Ok','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
    .pipe(
      tap((result) => {
        if (result === 'confirm') {
          this.router.navigate(['/fleet/assets']);
        }
        dialogClose$?.unsubscribe();
      })
    )
    .subscribe();
  
  }
}


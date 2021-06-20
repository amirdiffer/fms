import { Component, OnInit, Injector } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { TableSetting } from '@core/table';
import { ColumnType } from '@core/table/table.component';
import { Utility } from '@shared/utility/utility';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';

import { map, tap } from 'rxjs/operators';
import {
  BodyShopLocationFacade,
  BodyShopLocationService
} from '@feature/workshop/+state/body-shop/location';
import {
  ServiceShopLocationFacade,
  ServiceShopLocationService
} from '@feature/workshop/+state/service-shop/location';
import { DialogService } from '@core/dialog/dialog-template.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent extends Utility implements OnInit {
  isEdit: boolean = false;
  id: number;
  type = 'body-shop';

  inputForm: FormGroup;
  submited = false;
  filteredLocation;
  locationID: any[] = [
    {
      id: '1',
      name: 'Location ID 1'
    },
    {
      id: '2',
      name: 'Location ID 2'
    },
    {
      id: '3',
      name: 'Location ID 3'
    },
    {
      id: '4',
      name: 'Location ID 4'
    },
    {
      id: '5',
      name: 'Location ID 5'
    },
    {
      id: '6',
      name: 'Location ID 6'
    }
  ];
  /* locationData$ = this._facadeLocation.bodyShop$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          locationId: y.locationThirdPartyId,
          service: y.services.join(','),
          address: y.address,
          section: '',
          jobCard: y.numOfJobCards,
          technician: y.numOfTechnicians,
          capacity: y.capacity
        };
      });
    })
  ); */
  addLocation_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.location_id', field: 'locationId', width: 200 },
      {
        lable: 'tables.column.services',
        field: 'service',
        type: ColumnType.lable,
        width: 200
      },
      {
        lable: 'tables.column.address',
        field: 'address',
        type: ColumnType.lable,
        width: 200
      },
      // {
      //   lable: 'tables.column.section',
      //   field: 'section',
      //   type: ColumnType.lable,
      //   width: 120
      // },
      {
        lable: 'tables.column.job_card',
        field: 'jobCard',
        type: ColumnType.lable,
        width: 100,
        sortable: true
      },
      {
        lable: 'tables.column.technician',
        field: 'technician',
        type: ColumnType.lable,
        width: 100,
        sortable: true
      },
      {
        lable: 'tables.column.capacity',
        field: 'capacity',
        type: ColumnType.lable,
        width: 100,
        sortable: true
      }
    ],
    data: []
  };
  private _location: any;
  get service(): FormArray {
    return this.inputForm.get('services') as FormArray;
  }
  get slot(): FormArray {
    return this.inputForm.get('slots') as FormArray;
  }

  locationId;

  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private _roter: Router,
    private bodyShopfacadeLocation: BodyShopLocationFacade,
    private serviceShopFacadeLocation: ServiceShopLocationFacade,
    private bodyShopServiceLocation: BodyShopLocationService,
    private serviceShopServiceLocation: ServiceShopLocationService,
    private _dialogService : DialogService
  ) {
    super(injector);
    this.serviceShopFacadeLocation.resetParams();
    this.bodyShopfacadeLocation.resetParams();
  }

  ngOnInit(): void {
    // this._facadeLocation.loadAll();
    this.buildForm();
  }
  private buildForm() {
    this.inputForm = this._fb.group({
      locationID: [''],
      address: ['', [Validators.required]],
      slots: this._fb.array([this.createSlot()]),
      services: this._fb.array([this.createService()])
    });
    this.route.url.subscribe((params) => {
      this.isEdit =
        params.filter((x) => x.path == 'edit-location').length > 0
          ? true
          : false;

      if (this.isEdit) {
        this.type = params[1].path;
        this.id = +params[params.length - 1].path;

        (this.type == 'body-shop'
          ? this.bodyShopServiceLocation
          : this.serviceShopServiceLocation
        )
          .getLocationById(+params[params.length - 1].path)
          .pipe(map((x) => x.message))
          .subscribe(
            (x) => {
              if (x) {
                this.searchLocation({ query: x.locationThirdPartyId });
                this.locationId = x.locationThirdPartyId;
                this._location = x;
                this.inputForm.patchValue({
                  locationID: x.locationThirdPartyId,
                  address: x.address
                });
                for (let i = 0; i < x.services.length; i++) {
                  this.services.controls[i].patchValue({
                    service: x.services[i]
                  });
                  if (i != x.services.length - 1) {
                    this.addService();
                  }
                }
                for (let i = 0; i < x.slots.length; i++) {
                  this.slots.controls[i].patchValue({
                    thirdPartyLocationId: x.slots[i].thirdPartySlotId
                  });
                  if (i != x.slots.length - 1) {
                    this.addSlot();
                  }
                }
              }
            },
            () => {},
            () => {
              this.markDirty();
            }
          );
      } else {
      }
    });

    this.bodyShopfacadeLocation.submitted$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('success' , 
        (this.isEdit ? 'Edit location': 'Add new location' ), 
        (this.isEdit ? 'Changes Saved Successfully' : 'location Added Successfully'),'Ok')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
            this.router.navigate(['/workshop/location']).then(()=>{
              this.bodyShopfacadeLocation.loadAll();
            });
          }
          dialogClose$?.unsubscribe();
          })
        ).subscribe()
      }
    });

    this.bodyShopfacadeLocation.error$.subscribe((x) => {
      if (x?.error) {
        const dialog = this._dialogService.show('danger' , 
        (this.isEdit ? 'Edit location': 'Add new location' ), 
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

    this.serviceShopFacadeLocation.submitted$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('success' , 
        (this.isEdit ? 'Edit location': 'Add new location' ), 
        (this.isEdit ? 'Changes Saved Successfully' : 'location Added Successfully'),'Ok')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
            this.router.navigate(['/workshop/location']).then(()=>{
              this.serviceShopFacadeLocation.loadAll();
            });
          }
          dialogClose$?.unsubscribe();
          })
        ).subscribe()
      }
    });

    this.serviceShopFacadeLocation.error$.subscribe((x) => {
      if (x?.error) {
        const dialog = this._dialogService.show('danger' , 
        (this.isEdit ? 'Edit location': 'Add new location' ), 
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

  private markFormGroupDirty(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      //if (control.value) {
      control.markAsDirty();
      if (control.controls) {
        this.markFormGroupDirty(control);
      }
      //}
    });
  }
  searchLocation(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.locationID.length; i++) {
      let location = this.locationID[i];
      if (location.id.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(location);
      }
    }
    this.filteredLocation = filtered;
  }
  autocompleteValidationLocationID(input: FormControl) {
    const inputValid = input.value.id;
    if (inputValid) {
      return null;
    } else {
      return { needsExclamation: true };
    }
  }

  createSlot(): FormGroup {
    return this._fb.group({
      thirdPartyLocationId: ['', [Validators.required]]
    });
  }

  createService(): FormGroup {
    return this._fb.group({
      service: ['', [Validators.required]]
    });
  }

  addSlot() {
    const slots = <FormArray>this.inputForm.get('slots');

    if (slots.invalid) {
      return;
    }

    // slots.push(this.createSlot());
  }
  removeSlot(index) {
    this.slot.removeAt(index);
  }

  addService() {
    const services = <FormArray>this.inputForm.get('services');

    if (services.invalid) {
      return;
    }

    services.push(this.createService());
  }
  removeService(index) {
    this.service.removeAt(index);
  }
  addRequest() {
    this.submited = true;
    this.inputForm.markAllAsTouched();
    if (this.inputForm.invalid) {
      return;
    }

    const dialog = this._dialogService.show('warning' , 
              (this.isEdit ? 'Edit location' : 'Add new location') ,
              (this.isEdit ? 'Are you sure you want to submit this changes?' : 'Are you sure you want to add new location?') , 'Yes','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
    .pipe(
      tap((result) => {
      if (result === 'confirm') {
        let d = this.inputForm.getRawValue();
        let services = (<object[]>d.services).map((x) => (x = x['service']));
        let locationInfo: any = {
          locationThirdPartyId: 1,
          address: d.address,
          services: services,
          slots: d.slots
        };
        if (this.isEdit) {
          locationInfo = {
            ...locationInfo,
            id: this.id
          };
  
          if (this.type == 'body-shop') {
            this.bodyShopfacadeLocation.editLocation(locationInfo);
          }
          if (this.type == 'service-shop') {
            this.serviceShopFacadeLocation.editLocation(locationInfo);
          }
        } else {
          locationInfo = {
            ...locationInfo
          };
  
          if (this.type == 'body-shop') {
            this.bodyShopfacadeLocation.addLocation(locationInfo);
          }
          if (this.type == 'service-shop') {
            this.serviceShopFacadeLocation.addLocation(locationInfo);
          }
        }
      }
      dialogClose$?.unsubscribe();
      })
    ).subscribe();
  }

  cancelForm() {
    const dialog = this._dialogService.show('warning' , 'Are you sure you want to leave?' , 'You have unsaved changes! If you leave, your changes will be lost.' , 'Yes','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
    .pipe(
      tap((result) => {
      if (result === 'confirm') {
        this.router.navigate(['/workshop/location']);
      }
      dialogClose$?.unsubscribe();
      })
    ).subscribe();
  }

  get services(): FormArray {
    return this.inputForm.get('services') as FormArray;
  }

  get slots(): FormArray {
    return this.inputForm.get('slots') as FormArray;
  }
  markDirty() {
    this.markGroupDirty(this.inputForm);
  }
  markGroupDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      switch (formGroup.get(key).constructor.name) {
        case 'FormGroup':
          this.markGroupDirty(formGroup.get(key) as FormGroup);
          break;
        case 'FormArray':
          this.markArrayDirty(formGroup.get(key) as FormArray);
          break;
        case 'FormControl':
          this.markControlDirty(formGroup.get(key) as FormControl);
          break;
      }
    });
  }
  markArrayDirty(formArray: FormArray) {
    formArray.controls.forEach((control) => {
      switch (control.constructor.name) {
        case 'FormGroup':
          this.markGroupDirty(control as FormGroup);
          break;
        case 'FormArray':
          this.markArrayDirty(control as FormArray);
          break;
        case 'FormControl':
          this.markControlDirty(control as FormControl);
          break;
      }
    });
  }
  markControlDirty(formControl: FormControl) {
    formControl.markAsDirty();
  }
}

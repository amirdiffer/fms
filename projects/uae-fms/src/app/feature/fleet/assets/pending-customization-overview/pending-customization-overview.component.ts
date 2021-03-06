import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AssetMasterService } from '../../+state/assets/asset-master';
import { CustomizationService } from '../../+state/assets/customization';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '@core/dialog/dialog-template.component';
import { SubAssetSearchThroughFacade } from '@feature/fleet/+state/sub-asset/search-through';
import { AccessorySearchThroughFacade } from '@feature/fleet/+state/accessory/search-through';

@Component({
  selector: 'anms-pending-customization-overview',
  templateUrl: './pending-customization-overview.component.html',
  styleUrls: ['./pending-customization-overview.component.scss']
})
export class PendingCustomizationOverviewComponent implements OnInit {
  tableSetting;
  tableData: any[];
  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn = 'assets/icons/download-solid.svg';
  showCustomizationForm = false;
  firstCameraChecked = false;
  secondCameraChecked = false;
  thirdCameraChecked = false;
  firstCameraSerialNumber: string;
  secondCameraSerialNumber: string;
  thirdCameraSerialNumber: string;
  showFirstCameraForm = true;
  showSecondCameraForm = true;
  showThirdCameraForm = true;
  assetStatus$: Observable<any>;
  customizationData$: Observable<any>;
  customizationData;
  customizationForm: FormGroup;
  modelId;
  outp = {
    subAssets: [],
    accessories: []
  };
  assetId: number;


  subAsset: any[];
  _subAsset: any[];
  accessory: any[];
  _accessory: any[];

  pickData = new Subject();
  pickData$ = this.pickData.asObservable();

  accessoryLoaded = false;
  subAssetLoaded = false;
  assetLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private service: AssetMasterService,
    private fb: FormBuilder,
    private cusService: CustomizationService,
    private router: Router,
    private _dialogService : DialogService,
    private _searchTroughtSubasset: SubAssetSearchThroughFacade,
    private _searchTroughtAccessory: AccessorySearchThroughFacade,
  ) {this._searchTroughtAccessory.loadAvailableAccessory()}

  ngOnInit(): void {
    this.pickData$.subscribe((x) => {
      if (x == 'accessory') this.accessoryLoaded = true;
      if (x == 'subAsset') this.subAssetLoaded = true;
      if (x == 'asset') this.assetLoaded = true;
      if (this.accessoryLoaded && this.subAssetLoaded && this.assetLoaded) {
        this.outp.accessories = this.outp.accessories.map((y) => {
          if (y.accessoryId && y.accessoryId != '')
            return {
              ...y,
              accessory: y.accessoryId
                ? this._accessory.filter((z) => z.id == y.accessoryId)[0]
                : y
            };
          else return y;
        });
        this.outp.subAssets = this.outp.subAssets.map((y) => {
          if (y.subAssetId && y.subAssetId != '')
            return {
              ...y,
              subAsset: y.subAssetId
                ? this._subAsset.filter((z) => z.id == y.subAssetId)[0]
                : y
            };
          else return y;
        });
      }
    });

    this.tableSetting = {
      columns: [
        {
          lable: 'tables.column.item',
          field: 'item',
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.type',
          field: 'type',
          type: 1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: []
    };

    this._searchTroughtSubasset.searchSubAsset$.subscribe((x) => {
      this.subAsset = x;
      this._subAsset = x;
      this.pickData.next('subAsset');
    });
    this._searchTroughtAccessory.searchAccessory$.subscribe((x) => {
      this.accessory = x;
      this._accessory = x;
      this.pickData.next('accessory');
    });

    this.route.params.subscribe((x) => {
      if (x?.id) {
        this.assetId = x.id;
        this.customizationData$ = this.service
          .getAssetByID(x.id + '/customization')
          .pipe(
            map((a) => {
              if (a && a.message) {
                this.customizationData = a.message;
                this.customizationData.subAssets.forEach((e) => {
                  this.outp.subAssets.push({
                    checked: e?.subAssetId ? true : false,
                    subAssetId: e?.subAssetId ? e.subAssetId : '',
                    assetBcSubAssetId: e.assetBcSubAssetId
                  });
                });
                this.customizationData.accessories.forEach((e) => {
                  this.outp.accessories.push({
                    checked: e?.accessoryId ? true : false,
                    accessoryId: e?.accessoryId ? e.accessoryId : '',
                    assetBcAccessoryId: e.assetBcAccessoryId
                  });
                });

                /* this.customizationForm = this.fb.group({
              subAssets: new FormArray([this.createFields(a.message.subAssets.length)]),
              accessories: new FormArray([this.createFields(a.message.accessories.length)])
            }); */

                this.pickData.next('asset');
                return [
                  ...a.message.subAssets.map((b) => {
                    return {
                      item: `${b.subAssetMakeName} ${b.subAssetModelName}`,
                      type: 'Sub Asset'
                    };
                  }),
                  ...a.message.accessories.map((b) => {
                    return {
                      item: b.accessoryConfigurationName,
                      type: 'Accessory'
                    };
                  })
                ];
              }
            })
          );
        this.assetStatus$ = this.service
          .getAssetByID(x.id + '/summary/customization')
          .pipe(
            map((z) => {
              this._searchTroughtSubasset.loadAvailableSubAssetWithModelId(z.message.modelId)
              return z;
            })
          );
      }
    });
  }

  createFields(count): FormGroup {
    let fi = this.fb.group({
      serialNumbers: []
    });

    return fi;
  }

  subAssetCheckboxOnChange(event, index: number): void {
    if (!event) {
      this.outp.subAssets[index].subAsset = null;
    }
  }

  accessoryCheckboxOnChange(event, index: number): void {
    if (!event) {
      this.outp.accessories[index].accessory = null;
    }
  }

  save() {
    const dialog = this._dialogService.show('success' ,
                  'Apply Customization' , 
                  'Are you sure you want to apply Customization?' , 
                  'Yes',
                  'No'
                  );
    const dialogClose$:Subscription = dialog.dialogClosed$
    .pipe(
      tap((result) => {
        if (result === 'confirm') {
          let outdata = {
            accessories: this.outp.accessories
              .map((x) => {
                return {
                  assetBcAccessoryId: x.assetBcAccessoryId,
                  accessoryId: x.accessory?.id || null
                };
              })
              .filter((z) => z != null),
              subAssets: this.outp.subAssets
              .map((x) => {
                return {
                  assetBcSubAssetId: x.assetBcSubAssetId,
                  subAssetId: x.subAsset?.id || null
                };
              })
              .filter((z) => z != null)
          };
    
          this.cusService
            .compelete(outdata, this.assetId)
            .pipe(
              tap(
                (_) => {
                  const dialog = this._dialogService.show('success' ,
                  'Apply Customization' , 
                  'Customization Applied Successfully' , 
                  'Ok',
                  undefined
                  );
                  const dialogClose$:Subscription = dialog.dialogClosed$
                  .pipe(
                    tap((result) => {
                      if (result === 'confirm') {
                        this.router.navigate(['fleet/assets'] , { queryParams: {id: 'pendingCustomizationTab'}});
                      }
                      dialogClose$?.unsubscribe();
                    })
                  ).subscribe();
                },
                (error: HttpErrorResponse) => {
                  if (error.status === 404) {
                    const dialog = this._dialogService.show('danger' ,
                    'Apply Customization' , 
                    'This Accessory or Sub asset is not usable' , 
                    'Ok',
                    undefined
                    );
                    const dialogClose$:Subscription = dialog.dialogClosed$
                    .pipe(
                      tap((result) => {
                        dialogClose$?.unsubscribe();
                      })
                    ).subscribe();
                  }
                }
              )
            )
            .subscribe();
        }else{
        }
        dialogClose$?.unsubscribe();
      })
    ).subscribe();
  }

  filterAccessory($event) {
    if (!$event.query || $event.query == '') this.accessory = this._accessory;
    else {
      this.accessory = this._accessory.filter((x) => {
        if ((x.id + '').toLowerCase().indexOf($event.query.toLowerCase()) >= 0)
          return true;
        if (
          (x.itemName + '').toLowerCase().indexOf($event.query.toLowerCase()) >=
          0
        )
          return true;
        return false;
      });
    }
  }

  filterSubAsset($event) {
    if (!$event.query || $event.query == '') this.accessory = this._accessory;
    else {
      this.subAsset = this._subAsset.filter((x) => {
        if ((x.id + '').toLowerCase().indexOf($event.query.toLowerCase()) >= 0)
          return true;
        if (
          (x.modelName + '')
            .toLowerCase()
            .indexOf($event.query.toLowerCase()) >= 0
        )
          return true;
        if (
          (x.serialNumber + '')
            .toLowerCase()
            .indexOf($event.query.toLowerCase()) >= 0
        )
          return true;
        return false;
      });
    }
  }

}

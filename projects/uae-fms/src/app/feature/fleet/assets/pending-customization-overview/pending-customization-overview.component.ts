import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AssetMasterService } from '../../+state/assets/asset-master';
import { CustomizationService } from '../../+state/assets/customization';
import { SubAssetService } from '../../+state/sub-asset';
import { AccessoryService } from '../../+state/accessory';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

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

  dialogModal = false;
  dialogSetting: IDialogAlert = {
    header: 'Apply Customization',
    hasError: false,
    message: 'Are you sure you want to apply Customization',
    confirmButton: 'Yes',
    cancelButton: 'Cancel'
  };

  successDialogModal = false;
  successDialogSetting: IDialogAlert = {
    header: 'Customization Applied',
    hasError: false,
    message: 'Customization Applied Successfully',
    cancelButton: 'Ok'
  };

  outp = {
    subAssets: [],
    accessories: []
  };
  assetId: number;
  subAsset$ = this.subAssetService.loadFullList().pipe(
    map((x) => {
      return x.message.map((y) => ({ ...y, id: y.id, itemName: y.modelName }));
    })
  );
  accessory$ = this.accessoryService.loadFullList().pipe(
    map((x) => {
      return x.message.map((y) => ({ ...y, id: y.id, itemName: y.itemName }));
    })
  );

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
    private subAssetService: SubAssetService,
    private accessoryService: AccessoryService,
    private router: Router
  ) {}

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
        },
        {
          lable: 'tables.column.quantity',
          field: 'quantity',
          type: 2,
          thumbField: '',
          renderer: '',
          sortable: true
        },
        {
          lable: 'tables.column.attachment',
          field: 'attachment',
          type: 1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: []
    };

    this.subAsset$.subscribe((x) => {
      this.subAsset = x;
      this._subAsset = x;
      this.pickData.next('subAsset');
    });
    this.accessory$.subscribe((x) => {
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
    this.dialogSetting = {
      header: 'Apply Customization',
      hasError: false,
      message: 'Are you sure you want to apply Customization',
      confirmButton: 'Yes',
      cancelButton: 'Cancel'
    };

    this.dialogModal = true;
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

  dialogConfirm($event) {
    this.dialogModal = false;
    if ($event) {
      let outdata = {
        accessories: this.outp.accessories
          .map((x) => {
            // if (!x.accessory?.id || x.accessory?.id == null || x.accessory?.id == "") return;
            return {
              assetBcAccessoryId: x.assetBcAccessoryId,
              accessoryId: x.accessory?.id || null
            };
          })
          .filter((z) => z != null),
        subAssets: this.outp.subAssets
          .map((x) => {
            // if (!x.subAsset?.id || x.subAsset?.id == null || x.subAsset?.id == "") return;
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
              this.successDialogModal = true;
            },
            (error: HttpErrorResponse) => {
              if (error.status === 404) {
                this.dialogModal = true;
                this.dialogSetting.message =
                  'This Accessory or Sub asset is not usable';
                this.dialogSetting.hasError = true;
                this.dialogSetting.cancelButton = 'OK';
                this.dialogSetting.confirmButton = undefined;
              }
            }
          )
        )
        .subscribe();
    }
  }

  successDialogConfirm() {
    this.successDialogModal = false;
    this.router.navigate(['fleet/assets']);
  }
}

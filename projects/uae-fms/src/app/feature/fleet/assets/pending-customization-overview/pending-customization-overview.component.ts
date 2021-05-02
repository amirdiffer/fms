import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssetMasterService } from "../../+state/assets/asset-master";
import { CustomizationService } from "../../+state/assets/customization";

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
  outp = {
    subAssets: [],
    accessories: []
  }
  assetId: number;


  constructor(
    private route: ActivatedRoute,
    private service: AssetMasterService,
    private fb: FormBuilder,
    private cusService: CustomizationService
  ) { }

  ngOnInit(): void {
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

    this.route.params.subscribe(x => {
      if (x?.id) {
        this.assetId = x.id;
        this.customizationData$ = this.service.getAssetByID(x.id + "/customization").pipe(map(a => {
          if (a && a.message) {
            this.customizationData = a.message;
            this.customizationData.subAssets.forEach(e => {
              this.outp.subAssets.push({ checked: false, serial: '' });
            });
            this.customizationData.accessories.forEach(e => {
              this.outp.accessories.push({ checked: false, serial: '' });
            });

            /* this.customizationForm = this.fb.group({
              subAssets: new FormArray([this.createFields(a.message.subAssets.length)]),
              accessories: new FormArray([this.createFields(a.message.accessories.length)])
            }); */

            return [...a.message.subAssets.map(b => {
              return {
                item: `${b.subAssetMakeName} ${b.subAssetModelName}`,
                type: "Sub Asset"
              };
            }),
            ...a.message.accessories.map(b => {
              return {
                item: b.accessoryConfigurationName,
                type: "Accessory"
              };
            })];
          }
        }));
        this.assetStatus$ = this.service.getAssetByID(x.id + "/summary/customization").pipe(map(z => {
          return z;
        }));
      }
    });
  }



  createFields(count): FormGroup {
    let fi = this.fb.group({
      serialNumbers: []
    });

    return fi;
  }

  save() {
    console.log(this.outp);
    this.cusService.compelete()
  }
}

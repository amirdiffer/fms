import {
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { TableSetting } from '@core/table';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { AssetConfigurationService } from '@feature/configuration/asset-configuration/asset-configuration.service';
import {
  AssetTypeFacade,
  SubAssetTypeFacade
} from '@feature/configuration/+state/fleet-configuration/index';
import { Utility } from '@shared/utility/utility';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { IAssetType } from '@models/asset-type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-add-make',
  templateUrl: './add-make.component.html',
  styleUrls: ['./add-make.component.scss']
})
export class AddMakeComponent extends Utility implements OnInit, OnDestroy {
  //#region ViewChild
  @ViewChild('progressBar', { static: false }) progressBar: ElementRef;
  @ViewChild('small', { static: false }) small: ElementRef;
  //#endregion

  //#region Varibale
  radioButtonSelect: 'mModel';
  inputForm: FormGroup;
  color = '#0000005E';
  maxValue = 100;
  value = 80;
  percent = 80;
  fileName = 'CSV File only';
  submited = false;
  isEditing = false;

  
  dialogModal = false;
  dialogSetting: IDialogAlert = {
    header: 'Add Make',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };

  successDialog;
  assetTypeId;
  fleetType:string;
  fleetSubscription:Subscription;
  selectedCategory:string ='';
  //#endregion

  get makes(): FormArray {
    return this.inputForm.get('makes') as FormArray;
  }

  constructor(
    private _fb: FormBuilder,
    private _subAssetTypeFacade: SubAssetTypeFacade,
    private facade: AssetTypeFacade,
    public dataService: DataService,
    public route: ActivatedRoute,
    public router: Router,
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      typeCategory: ['asset', Validators.required],
      makes: new FormArray([this.createMake()])
    });


    let activeRoute = this.route.snapshot.url.map(x => {return x.path});
    let id = +this.route.snapshot.params.id;
    this.assetTypeId = this.route.snapshot.params.assetTypeId ? this.route.snapshot.params.assetTypeId : this.route.snapshot.params.assetType
    this.fleetType = this.route.snapshot.params.fleetType;
    this.dataService.selectType(this.fleetType)


    /* Check is Edit Form  */
    if(activeRoute.find(item => item == "edit-make")){
      this.isEditing = true;
    }
    /* Check fleet Type from ActivatedRoute */
    switch (this.fleetType) {
      case 'ASSET':
        this.facade.getAssetTypeByID(this.assetTypeId );
        this.facade.loaded$.subscribe(
          load => {
            if(load) {
              this.fleetSubscription = this.facade.specificAssetType$.subscribe(x => {
                if(x) {
                  
                  this.selectedCategory = x.name ? x.name: '';
                  if(this.isEditing){
                    console.log(x)
                    let makes = {
                      name : x.makes.find( y => y.id == id),
                      description : x.makes.find( y => y.id == id),
                    }
                    this.makes.controls[0].patchValue({
                      id: id,
                      make: makes.name ? makes.name.name : null,
                      makeDescription: makes.description ? makes.description.description:null
                    });
                  }
                }
              });
            }
          }
        )
        this.inputForm.patchValue({
          typeCategory:['ASSET']
        })
        break;
      case 'SUB_ASSET':
        this._subAssetTypeFacade.getSubAssetTypeByID(this.assetTypeId )
        this._subAssetTypeFacade.loaded$.subscribe(
          load => {
            if(load) {
              this._subAssetTypeFacade.specificSubAssetType$.subscribe(x => {
                if(x) {
                  console.log(x);
                  this.selectedCategory = x.name;
                  if(this.isEditing){
                    let makes = {
                      name : x.makes.find( y => y.id == id),
                      description : x.makes.find( y => y.id == id),
                    }
                    this.makes.controls[0].patchValue({
                      id: id,
                      make: makes.name ? makes.name.name : null,
                      makeDescription: makes.description ? makes.description.description:null
                    });
                  }
                }
              });
            }
          }
        )
        this.inputForm.patchValue({
          typeCategory:['SUB_ASSET']
        })
        break;
    }
    
    this.errorAndSubmitHandler(this.facade);
    this.errorAndSubmitHandler(this._subAssetTypeFacade);
  }

  createMake(isOptional?: boolean): FormGroup {
    if (isOptional) {
      return this._fb.group({
        id: null,
        make: '',
        makeDescription: '',
        origins: [['USA']],
        models: [[]]
      });
    }
    return this._fb.group({
      id: [],
      make: ['', Validators.required],
      makeDescription: ['', Validators.required],
      origins: [['USA']],
      models: [[]]
    });
  }

  addMake(): void {
    if (this.makes.invalid) {
      return;
    }
    this.makes.push(this.createMake());
  }

  addOptionalMake(): void {
    if (this.makes.invalid) {
      return;
    }
    this.makes.push(this.createMake());
  }

  removeMake(index: number): void {
    this.makes.removeAt(index);
  }


  public addModel() {
    const model = new FormControl('');
    (<FormArray>this.inputForm.get('models')).push(model);
  }

  public cancel() {
    this.dialogModal = true;
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message = 'Are you sure to cancel adding new type?';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'No';
    // this._assetConfigurationService.loadAddForm(false);
  }

  dialogConfirm($event): void {
    this.dialogModal = false;
    if($event && this.successDialog){
      this.fleetType == 'ASSET' ? this.facade.resetParams() : this._subAssetTypeFacade.resetParams();
    }
    if ($event && !this.dialogSetting.hasError) {
      this.router.navigate(['/configuration/asset-configuration'])
    }
  }

  errorAndSubmitHandler(facade) {
    facade.submitted$.subscribe((x) => {
      if (x) {
        this.successDialog= true;
        if (this.isEditing) {
          this.dialogModal = true;
          this.dialogSetting.header = 'Edit Make';
          this.dialogSetting.message = 'Make Edited Successfully';
          this.dialogSetting.isWarning = false;
          this.dialogSetting.hasError = false;
          this.dialogSetting.confirmButton = 'OK';
          this.dialogSetting.cancelButton = undefined;
          return;
        }
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new type';
        this.dialogSetting.message = 'Make Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
        
      }
    });

    facade.error$.subscribe((x) => {
      if (x?.error) {
        x?.error;
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new make';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });
  }
  submit() {
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    }
    const payload = {
      makes: []
    };
    for (const make of this.inputForm.value.makes) {
      payload.makes.push({
        id: make.id,
        name: make.make,
        description: make.makeDescription
      });
    }
    if (this.isEditing) {
      if (this.fleetType === 'SUB_ASSET') {
        this._subAssetTypeFacade.updateMake(payload, this.assetTypeId);
      } else if(this.fleetType === 'ASSET') {
        this.facade.updateMake(payload, this.assetTypeId);
      }
      return;
    }else{
      let newPayload = {
        makes:payload.makes.map(x => {
          return {
            name: x.name,
            description: x.description
          }
        })
      }
      if (this.fleetType === 'ASSET') {
        this.facade.addMake(newPayload, this.assetTypeId);;
      } else if(this.fleetType === 'SUB_ASSET') {
        this._subAssetTypeFacade.addMake(newPayload, this.assetTypeId);
      }
      return;
    }
  }

  ngOnDestroy(): void {
    
  }
}

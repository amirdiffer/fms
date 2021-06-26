import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableSetting } from '@core/table';
import { IAssetType, Make, MakeModel } from '@models/asset-type.model';
import { AssetConfigurationService } from '@feature/configuration/asset-configuration/asset-configuration.service';
import { SubAssetTypeFacade } from '../../+state/fleet-configuration/sub-asset-type';
import { AssetTypeFacade } from '../../+state/fleet-configuration/asset-type';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { Utility } from '@shared/utility/utility';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogService } from '@core/dialog/dialog-template.component';

@Component({
  selector: 'anms-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent extends Utility implements OnInit, OnDestroy {
  //#region ViewChild
  @ViewChild('progressBar', { static: false }) progressBar: ElementRef;
  @ViewChild('small', { static: false }) small: ElementRef;
  //#endregion

  //#region Variable
  radioButtonSelect: 'mModel';
  public filesUpdloaded: NgxFileDropEntry[] = [];
  inputForm: FormGroup;
  color = '#0000005E';
  maxValue = 100;
  value = 80;
  percent = 80;
  fileName = 'CSV File only';
  submited = false;
  isEditing = false;
  assetTypeMode = '';
  modelId;

  makeId;
  assetTypeId;
  fleetType: string;
  fleetSubscription: Subscription;
  selectedCategory: string = '';
  //#endregion
  successDialog;
  get models(): FormArray {
    return this.inputForm.get('models') as FormArray;
  }

  constructor(
    private _fb: FormBuilder,
    private facade: AssetTypeFacade,
    private _subAssetTypeFacade: SubAssetTypeFacade,
    public dataService: DataService,
    public router: Router,
    injector: Injector,
    private dialogService: DialogService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      typeCategory: ['asset', Validators.required],
      models: new FormArray([this.createModel()])
    });

    let activeRoute = this.route.snapshot.url.map((x) => {
      return x.path;
    });
    let id = +this.route.snapshot.params.id;
    this.assetTypeId = this.route.snapshot.params.assetTypeId
      ? this.route.snapshot.params.assetTypeId
      : this.route.snapshot.params.assetType;
    this.fleetType = this.route.snapshot.params.fleetType;
    this.makeId = this.route.snapshot.params.make
      ? +this.route.snapshot.params.make
      : +this.route.snapshot.params.makeId;

    /* Check is Edit Form  */
    if (activeRoute.find((item) => item == 'edit-model')) {
      this.isEditing = true;
    }

    /* Check fleet Type from ActivatedRoute */
    switch (this.fleetType) {
      case 'ASSET':
        this.facade.getAssetTypeByID(this.assetTypeId);
        this.facade.loaded$.subscribe((load) => {
          if (load) {
            this.fleetSubscription = this.facade.specificAssetType$.subscribe(
              (x) => {
                if (x) {
                  console.log(x);
                  this.selectedCategory = x.makes.find(
                    (y) => y.id == this.makeId
                  )
                    ? x.makes.find((y) => y.id == this.makeId).name
                    : '';
                  if (this.isEditing) {
                    let makes = {
                      name: x.makes.find((y) => y.id == this.makeId)
                        ? x.makes.find((y) => y.id == this.makeId).name
                        : false,
                      description: x.makes.find((y) => y.id == this.makeId)
                        ? x.makes.find((y) => y.id == this.makeId).description
                        : false,
                      models: x.makes.find((y) => y.id == this.makeId)
                        ? x.makes.find((y) => y.id == this.makeId).models
                        : false
                    };
                    let models = {
                      name: makes.models
                        ? makes.models.find((y) => y.id == id).name
                        : false,
                      description: makes.models
                        ? makes.models.find((y) => y.id == id).description
                        : false
                    };
                    this.models.controls[0].patchValue({
                      id: id,
                      model: models.name,
                      modelDescription: models.description
                    });
                  }
                }
              }
            );
          }
        });

        this.inputForm.patchValue({
          typeCategory: ['ASSET']
        });
        break;
      case 'SUB_ASSET':
        this._subAssetTypeFacade.getSubAssetTypeByID(this.assetTypeId);
        this._subAssetTypeFacade.loaded$.subscribe((load) => {
          if (load) {
            this._subAssetTypeFacade.specificSubAssetType$.subscribe((x) => {
              if (x) {
                console.log(x);
                this.selectedCategory = x.makes.find((y) => y.id == this.makeId)
                  ? x.makes.find((y) => y.id == this.makeId).name
                  : '';
                if (this.isEditing) {
                  let makes = {
                    name: x.makes.find((y) => y.id == this.makeId)
                      ? x.makes.find((y) => y.id == this.makeId).name
                      : false,
                    description: x.makes.find((y) => y.id == this.makeId)
                      ? x.makes.find((y) => y.id == this.makeId).description
                      : false,
                    models: x.makes.find((y) => y.id == this.makeId)
                      ? x.makes.find((y) => y.id == this.makeId).models
                      : false
                  };
                  let models = {
                    name: makes.models
                      ? makes.models.find((y) => y.id == id).name
                      : false,
                    description: makes.models
                      ? makes.models.find((y) => y.id == id).description
                      : false
                  };
                  this.models.controls[0].patchValue({
                    id: id,
                    model: models.name,
                    modelDescription: models.description
                  });
                }
              }
            });
          }
        });

        this.inputForm.patchValue({
          typeCategory: ['SUB_ASSET']
        });
        break;
    }

    this.errorAndSubmitHandler(this.facade);
    this.errorAndSubmitHandler(this._subAssetTypeFacade);
  }

  createModel(isOptional?: boolean): FormGroup {
    if (isOptional) {
      return this._fb.group({
        id: [''],
        model: ['', [Validators.required]],
        modelDescription: ['', [Validators.required]],
        trims: [[]]
      });
    }
    return this._fb.group({
      id: '',
      model: ['', Validators.compose([Validators.required])],
      modelDescription: ['', Validators.compose([Validators.required])],
      trims: [[]]
    });
  }

  addModel(): void {
    if (this.models.invalid) {
      return;
    }
    this.models.push(this.createModel());
  }

  addOptionalModel(): void {
    if (this.models.invalid) {
      return;
    }
    this.models.push(this.createModel());
  }

  removeModel(index: number): void {
    this.models.removeAt(index);
  }

  public cancel() {
    const dialog = this.dialogService.show('warning', 'Add Model',
      'Are you sure to cancel adding new type ?', 'Yes', 'No');
    dialog.dialogClosed$.subscribe(result => {
      if (result === 'confirm') {
        this.router.navigate(['/configuration/asset-configuration']).then();
      }
    });
  }

  submit() {
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    }
    const payload = {
      models: []
    };
    for (const make of this.inputForm.value.models) {
      payload.models.push({
        id: make.id,
        name: make.model,
        description: make.modelDescription,
        origins: ['Japan']
      });
    }

    if (this.isEditing) {
      if (this.fleetType === 'SUB_ASSET') {
        this._subAssetTypeFacade.updateModel(
          payload,
          this.assetTypeId,
          this.makeId
        );
      } else if (this.fleetType === 'ASSET') {
        let newPayload = {
          models: payload.models.map((x) => {
            return {
              id: x.id,
              name: x.name,
              description: x.description
            };
          })
        };
        this.facade.updateModel(newPayload, this.assetTypeId, this.makeId);
      }
      return;
    } else {
      let newPayload = {
        models: payload.models.map((x) => {
          return {
            name: x.name,
            description: x.description
          };
        })
      };
      let newPayloadSubAsset = {
        models: payload.models.map((x) => {
          return {
            name: x.name,
            description: x.description,
            origins: x.origins
          };
        })
      };
      if (this.fleetType === 'ASSET') {
        this.facade.addModel(newPayload, this.assetTypeId, this.makeId);
      } else if (this.fleetType === 'SUB_ASSET') {
        this._subAssetTypeFacade.addModel(
          newPayloadSubAsset,
          this.assetTypeId,
          this.makeId
        );
      }
      return;
    }
  }
  errorAndSubmitHandler(facade) {
    facade.submitted$.subscribe((x) => {
      if (x) {
        this.successDialog = true;
        if (this.isEditing) {
          const editDialog = this.dialogService.show('success', 'Edit Model',
            'Model Edited Successfully', 'OK', '');
          editDialog.dialogClosed$.subscribe(result => {
            if (result === 'confirm') {
              if (this.fleetType === 'ASSET') {
                this.facade.resetParams();
              } else {
                this._subAssetTypeFacade.resetParams();
              }
              this.router.navigate(['/configuration/asset-configuration']).then();
            }
          });
          return;
        }
        const addDialog = this.dialogService.show('success', 'Add new model',
          'Model Added Successfully', 'OK', '');
        addDialog.dialogClosed$.subscribe(result => {
          if (result === 'confirm') {
            if (this.fleetType === 'ASSET') {
              this.facade.resetParams();
            } else {
              this._subAssetTypeFacade.resetParams();
            }
            this.router.navigate(['/configuration/asset-configuration']).then();
          }
        });
      }
    });

    facade.error$.subscribe((x) => {
      if (x?.error) {
        const dialog = this.dialogService.show('danger', 'Add new model',
          'Error occurred in progress', 'OK', '');
        dialog.dialogClosed$.subscribe(result => {
          if (result === 'confirm') {
          } else {
          }
        });
      }
    });
  }
  ngOnDestroy(): void {}
}

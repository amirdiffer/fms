import {
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Make } from '@models/asset-type.model';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { AssetTypeFacade } from '@feature/configuration/+state/fleet-configuration/index';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { Utility } from '@shared/utility/utility';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'anms-add-trim',
  templateUrl: './add-trim.component.html',
  styleUrls: ['./add-trim.component.scss']
})
export class AddTrimComponent extends Utility implements OnInit, OnDestroy {
  //#region ViewChild
  @ViewChild('progressBar', { static: false }) progressBar: ElementRef;
  @ViewChild('small', { static: false }) small: ElementRef;
  //#endregion

  //#region Variable
  radioButtonSelect: 'mModel';
  inputForm: FormGroup;
  color = '#0000005E';
  color1 = '#0000005E';
  maxValue = 100;
  value = 80;
  percent = 80;
  fileName = 'CSV File only';
  submited = false;

  dialogModal = false;

  dialogSetting: IDialogAlert = {
    header: 'Add Trim',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };

  get trims(): FormArray {
    return this.inputForm.get('trims') as FormArray;
  }
  id;
  makeId;
  modelId;
  assetTypeId;
  fleetType: string;
  fleetSubscription: Subscription;
  selectedMake: string = '';
  selectedModel: string = '';
  isEditing = false;
  successDialog;
  //#endregion

  constructor(
    private _fb: FormBuilder,
    private facade: AssetTypeFacade,
    public dataService: DataService,
    public router: Router,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      typeCategory: ['asset'],
      trims: new FormArray([this.createTrim()])
    });

    let activeRoute = this.route.snapshot.url.map((x) => {
      return x.path;
    });
    this.id = +this.route.snapshot.params.id;
    this.assetTypeId = this.route.snapshot.params.assetTypeId
      ? this.route.snapshot.params.assetTypeId
      : this.route.snapshot.params.assetType;
    this.makeId = this.route.snapshot.params.make
      ? +this.route.snapshot.params.make
      : +this.route.snapshot.params.makeId;
    this.modelId = this.route.snapshot.params.model
      ? +this.route.snapshot.params.model
      : +this.route.snapshot.params.modelId;

    /* Check is Edit Form  */
    if (activeRoute.find((item) => item == 'edit-trim')) {
      this.isEditing = true;
    }
    if (this.assetTypeId) {
      this.facade.getAssetTypeByID(this.assetTypeId);
      this.facade.loaded$.subscribe((load) => {
        if (load) {
          this.fleetSubscription = this.facade.specificAssetType$.subscribe(
            (x) => {
              if (x) {
                let makes = {
                  name: x.makes.find((y) => y.id == this.makeId).name,
                  description: x.makes.find((y) => y.id == this.makeId)
                    .description,
                  models: x.makes.find((y) => y.id == this.makeId).models
                };

                this.selectedMake = x.makes.find(
                  (y) => y.id == this.makeId
                ).name;
                let models = {
                  name: makes.models.find((y) => y.id == this.modelId).name,
                  description: makes.models.find((y) => y.id == this.modelId)
                    .description,
                  trims: makes.models.find((y) => y.id == this.modelId).trims
                };

                this.selectedModel = makes.models.find(
                  (y) => y.id == this.modelId
                ).name;
                if (this.isEditing) {
                  let trims = {
                    name: models.trims.find((y) => y.id == this.id).name,
                    colors: models.trims.find((y) => y.id == this.id).colors
                  };
                  console.log(trims);
                  this.trims.controls[0].patchValue({
                    trim: trims.name
                  });
                  for (let index = 0; index < trims.colors.length; index++) {
                    this.colors(0).controls[index].patchValue({
                      id: trims.colors[index].id,
                      name: trims.colors[index].name,
                      hexColor: trims.colors[index].hexColor
                    });
                    if (index + 1 !== trims.colors.length) {
                      this.addColor(0);
                    }
                    console.log(index, trims.colors.length);
                  }
                }
              }
            }
          );
        }
      });
    }

    this.facade.submitted$.subscribe((x) => {
      if (x) {
        this.successDialog = true;
        if (this.isEditing) {
          this.dialogModal = true;
          this.dialogSetting.header = 'Edit Trim';
          this.dialogSetting.message = 'Trim Edited Successfully';
          this.dialogSetting.isWarning = false;
          this.dialogSetting.hasError = false;
          this.dialogSetting.confirmButton = 'OK';
          this.dialogSetting.cancelButton = undefined;
          return;
        }
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new trim';
        this.dialogSetting.message = 'Trim Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
      }
    });

    this.facade.error$.subscribe((x) => {
      if (x?.error) {
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new trim';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });
  }

  colors(index: number): FormArray {
    const trims = this.inputForm.get('trims') as FormArray;
    return trims.controls[index].get('colors') as FormArray;
  }

  createTrim(isOptional?: boolean): FormGroup {
    if (isOptional) {
      return this._fb.group({
        id: '',
        trim: '',
        description: 'Something about the trim.',
        colors: new FormArray([this.createColor()])
      });
    }
    return this._fb.group({
      id: '',
      trim: ['', Validators.required],
      description: 'Something about the trim.',
      colors: new FormArray([this.createColor()]),
      origins: []
    });
  }

  createColor(): FormGroup {
    return this._fb.group({
      name: 'FFFFFF',
      hexColor: 'FFFFFF'
    });
  }

  addColor(index: number): void {
    this.colors(index).push(this.createColor());
  }

  removeColor(index: number): void {
    this.colors(index).removeAt(this.colors(index).length - 1);
  }

  addTrim(): void {
    if (this.trims.invalid) return;
    this.trims.push(this.createTrim());
  }

  addOptionalMake(): void {
    if (this.trims.invalid) {
      return;
    }
    this.trims.push(this.createTrim());
  }

  removeTrim(index: number): void {
    this.trims.removeAt(index);
  }

  uploadAssetPicture(evt, index: number): void {
    if (!evt || !evt.files) {
      return;
    }
    const docId = evt.files[0];
    const docControl = this.trims.at(index).get('file');
    docControl.setValue(docId);
  }
  cancel() {
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
    if ($event && this.successDialog) {
      this.facade.resetParams();
    }
    if ($event && !this.dialogSetting.hasError) {
      this.router.navigate(['/configuration/asset-configuration']);
    }
  }

  selectedColor(event, color): void {
    color.value.name = event;
  }

  submit() {
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    }

    if (this.isEditing) {
      const payload = {
        trims: []
      };
      for (const trim of this.inputForm.value.trims) {
        payload.trims.push({
          id: this.id,
          name: trim.trim,
          description: trim.description,
          origins: ['Germany'],
          colors: trim.colors
        });
      }

      this.facade.updateTrim(
        payload,
        this.assetTypeId,
        this.makeId,
        this.modelId
      );
      return;
    }

    let type: string;

    const makes: Make[] = [];

    const data = {
      trims: this.inputForm.value.trims.map((x) => {
        if (x.id) {
          return {
            id: x.id,
            name: x.trim,
            description: x.description,
            meterType: 'KILOMETER',
            meterValue: 10,
            origins: ['Germany'],
            colors: x.colors.map((y) => {
              return {
                name: y.name,
                hexColor: y.hexColor
              };
            })
          };
        } else {
          return {
            name: x.trim,
            description: x.description,
            meterType: 'KILOMETER',
            meterValue: 10,
            origins: ['Germany'],
            colors: x.colors.map((y) => {
              return {
                name: y.name,
                hexColor: y.hexColor
              };
            })
          };
        }
      })
    };

    this.facade.addTrim(data, this.assetTypeId, this.makeId, this.modelId);
  }

  ngOnDestroy(): void {}
}

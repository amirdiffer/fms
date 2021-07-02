import { Component, Injector, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { IRequest } from '@models/body-shop';
import { Subject, Subscription } from 'rxjs';
import {
  AssetMasterFacade,
  AssetMasterService
} from '@feature/fleet/+state/assets/asset-master';
import { Location } from '@angular/common';
import { AssetSearchThroughFacade } from '@feature/fleet/+state/assets/search-through';
import { ServiceShopRequestFacade, ServiceShopRequestService } from '@feature/workshop/+state/service-shop/request';
import { DialogService } from '@core/dialog/dialog-template.component';
import { Utility } from '@shared/utility/utility';
@Component({
  selector: 'workshop-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestServiceShopComponent extends Utility implements OnInit {

  activePriority: string = 'high';
  progressBarValue = 50;
  bufferValue = 70;
  tableSettingServie;
  tableSettingWarranty;
  oldAssetSuggests: any[];
  filteredAsset: any[];
  submited = false;
  assets: any[] = [];
  newAssets: any[];
  inputForm: FormGroup;
  isEdit: boolean = false;
  id: number;
  specificAsset: boolean = false;
  specificAssetId: number;
  private _request: IRequest;
  getAssetsList = new Subject();
  assetId: any;
  profileDocIds: number[] = [];
  get assetIdFormControl() {
    return this.inputForm.get('assetId') as FormControl;
  }
  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private _serviceShopRequestService: ServiceShopRequestService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _serviceShopRequestFacade: ServiceShopRequestFacade,
    private _assetMasterService: AssetMasterService,
    private _assetSearchThrough: AssetSearchThroughFacade,
    private _location: Location,
    private _dialogService : DialogService
  ) {super(injector);}

  ngOnInit(): void {
    this._assetSearchThrough.loadAvailableAssetForAddingRequest();
    this._assetSearchThrough.searchAsset$.subscribe(
      x => {
        if(x){
          this.assets =x.map( y => {
            return {
              id: y.id, name: y.dpd
            }
          })
        }
      }
    )
    this.buildForm();
    if (
      this._route.snapshot.url[this._route.snapshot.url.length - 1].path ===
        'add-request' &&
      this._route.snapshot.parent.params.id
    ) {
      this.specificAsset = true;
      this.specificAssetId = +this._route.snapshot.parent.params.id;
      this._assetMasterService
        .getAssetByID(this.specificAssetId)
        .subscribe((x) => {
          if (x) {
            this.inputForm.patchValue({
              assetId: {
                name: x.message.dpd,
                id: x.message.id
              }
            });
            this.inputForm.controls['assetId'].disable();
            this.inputForm.controls['assetId'].markAsDirty();
          }
        });
    }
    this._route.url.subscribe((params) => {
      this.isEdit =
        params.filter((x) => x.path == 'edit-request').length > 0
          ? true
          : false;

      if (this.isEdit) {
        this.id = +params[params.length - 1].path;
        this._serviceShopRequestService
          .getRequestById(params[params.length - 1].path)
          .pipe(map((x) => x.message))
          .subscribe((x) => {
            if (x) {
              this._request = x;
              this.profileDocIds = Array.isArray(x.documentIds)
                ? x.documentIds
                : [x.documentIds];
              this.inputForm.patchValue({
                assetId: {
                  name: x.asset.dpd,
                  id: x.asset.id
                },
                hasAccident: x.hasAccident,
                jobType: x.jobType,
                priority: x.priority,
                accidentType: x.accidentType
              });
              this.inputForm.controls['assetId'].disable();
              this.changePriority(x.priority);
              this.inputForm.controls['issueInfo'].patchValue({
                issue: x.request,
                reportedBy: x.reportedBy,
                description: x.description,
                gpsMeterSource: x.gpsMeterSource
              });
            }
          });
      } else {
      }
      this._serviceShopRequestFacade.submitted$.subscribe((x) => {
        if (x) {
          const dialog = this._dialogService.show('success' , 
          (this.isEdit ? 'Edit request': 'Add new request' ), 
          (this.isEdit ? 'Changes Saved Successfully' : 'request Added Successfully'),'Ok')
          const dialogClose$:Subscription = dialog.dialogClosed$
          .pipe(
            tap((result) => {
            if (result === 'confirm') {
              this._router.navigate(['/workshop/service-shop'] , { queryParams: { id: 'requestTab' }}).then(()=>{
                this._serviceShopRequestFacade.loadAll();
              });
            }
            dialogClose$?.unsubscribe();
            })
          ).subscribe()
        }
      });

      this._serviceShopRequestFacade.error$.subscribe((x) => {
        if (x?.error) {
          const dialog = this._dialogService.show('danger' , 
          (this.isEdit ? 'Edit request': 'Add new request' ), 
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

      // this.getAssetsList.pipe(debounceTime(600)).subscribe(x => {
      //   this.userService.searchEmployee(x["query"]).subscribe(y => {
      //     if (y) {
      //       this.employees.next([y.message])
      //     } else {
      //       this.employees.next(null)
      //     }
      //   })
      // })
    });
    // this.tableSettingServie = this._fakeService.tableSettingService;
    // this.tableSettingWarranty = this._fakeService.tableSettingWarranty;
  }

  private buildForm() {
    this.inputForm = this._fb.group({
      // assetSearch: ['', [Validators.required, this.autocompleteValidation]],
      // assetInfo: this._fb.group({
      //   asset: [''],
      //   gpsMeterSource: ['', Validators.required]
      // }),
      assetId: ['',Validators.compose([Validators.required , this.autocompleteAssetIDValidation])],
      hasAccident: [false],
      accidentType: ['MINOR'],
      jobType: ['NORMAL'],
      issueInfo: this._fb.group({
        issue: ['', Validators.required],
        reportedBy: ['', Validators.required],
        description: ['', Validators.required],
        gpsMeterSource: ['', Validators.required]
      }),
      priority: [''],
      file: ['']
    });
  }

  searchAsset(event) {
    let copyAssets = [];
    copyAssets = this.assets.slice();
    this.newAssets = copyAssets.filter((a) => a.name.includes(event.query));
  }

  selectedAsset(value) {
    this.inputForm.patchValue({
      assetInfo: {
        asset: value.name,
        gpsMeterSource: value.gps
      }
      //Meter Type
    });
  }
  autocompleteValidation(input: FormControl) {
    const inputValid = input.value.name;
    if (inputValid) {
      return null;
    } else {
      return { needsExclamation: true };
    }
  }

  addRequest() {
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    }
    const dialog = this._dialogService.show('warning' , 
    (this.isEdit ? 'Edit request' : 'Add new request') ,
    (this.isEdit ? 'Are you sure you want to submit this changes?' : 'Are you sure you want to add new request?') , 'Yes','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
      .pipe(
        tap((result) => {
          
        if (result === 'confirm') {
          let d = this.inputForm.getRawValue();
          let requestInfo: any = {
            assetId: d.assetId.id,
            gpsMeterSource: d.issueInfo.gpsMeterSource,
            hasAccident: d.hasAccident,
            accidentType: d.accidentType,
            jobType: d.jobType,
            reportedBy: d.issueInfo.reportedBy,
            request: d.issueInfo.issue,
            description: d.issueInfo.description,
            priority: d.priority,
            documentIds: this.profileDocIds
          };

          if (this.isEdit) {
            requestInfo = {
              ...requestInfo,
              id: this.id
            };

            this._serviceShopRequestFacade.editRequest(requestInfo);
          } else {
            requestInfo = {
              ...requestInfo
            };
            this._serviceShopRequestFacade.addRequest(requestInfo);
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
        this._router.navigate(['/workshop/service-shop'] , { queryParams: { id: 'requestTab' }});
      }
      dialogClose$?.unsubscribe();
      })
    ).subscribe();
  }
  changePriority(statusPriority): void {
    this.activePriority = statusPriority;
  }

  uploadImage($event) {
    this.profileDocIds = [];
    if (!$event || !$event.files) {
      return;
    }
    this.profileDocIds = $event.files;
  }

   /* Custom validation */
   autocompleteAssetIDValidation(input: FormControl) {
    if(input.value && input.value !== null){
      const inputValid = input.value.name;
      if (inputValid) {
        return null;
      } else {
        return { needsExclamation: true };
      }
    }
  }

  autocompleteErrorMessage(formControl:FormControl){
    if(formControl.invalid && formControl.errors && formControl.errors !== null){
      if(formControl.errors.required){
        return;
      }
      return formControl.errors.needsExclamation
    }
  }
}

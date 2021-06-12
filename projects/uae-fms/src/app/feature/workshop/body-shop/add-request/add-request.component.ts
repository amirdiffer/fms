import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';

import { map } from 'rxjs/operators';
import { IRequest } from '@models/body-shop';
import { Subject } from 'rxjs';
import {
  AssetMasterFacade,
  AssetMasterService
} from '@feature/fleet/+state/assets/asset-master';
import { Location } from '@angular/common';
import { BodyShopRequestFacade, BodyShopRequestService } from '@feature/workshop/+state/body-shop/request';
@Component({
  selector: 'workshop-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {
  //#region Dialog
  dialogModal = false;

  dialogSetting: IDialogAlert = {
    header: 'Add Request',
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
  errorDialogModal = false;
  //#endregion Dialog

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
  public filesUpdloaded: NgxFileDropEntry[] = [];
  isEdit: boolean = false;
  id: number;
  specificAsset: boolean = false;
  specificAssetId: number;
  private _request: IRequest;
  getAssetsList = new Subject();
  assetId: any;
  profileDocIds: number[] = [];
  constructor(
    private _fb: FormBuilder,
    private bodyShopRequestService: BodyShopRequestService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _bodyShopRequestFacade: BodyShopRequestFacade,
    private _assetMasterFacade: AssetMasterFacade,
    private _assetMasterService: AssetMasterService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._assetMasterService.getAllAllowedAssetForRequest().subscribe((x) => {
      console.log(x);
    });
    this._assetMasterFacade.loadAll();
    this._assetMasterService
      .getAllAllowedAssetForRequest()
      .pipe(map((y) => y.message.map((x) => ({ id: x.id, name: x.dpd }))))
      .subscribe((data) => (this.assets = data));
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
        this.bodyShopRequestService
          .getRequestById(params[params.length - 1].path)
          .pipe(map((x) => x.message))
          .subscribe((x) => {
            if (x) {
              console.log(x);
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
                priority: x.priority, //'HIGH',
                accidentType: x.accidentType
              });
              this.inputForm.controls['assetId'].disable();
              this.inputForm.controls['assetId'].markAsDirty();
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
      this._bodyShopRequestFacade.submitted$.subscribe((x) => {
        if (x) {
          this.dialogModal = true;
          this.dialogType = 'success';
          this.dialogSetting.header = this.isEdit
            ? 'Edit request'
            : 'Add new request';
          this.dialogSetting.message = this.isEdit
            ? 'Changes Saved Successfully'
            : 'Request Added Successfully';
          this.dialogSetting.isWarning = false;
          this.dialogSetting.hasError = false;
          this.dialogSetting.confirmButton = 'Yes';
          this.dialogSetting.cancelButton = undefined;
        }
      });

      this._bodyShopRequestFacade.error$.subscribe((x) => {
        if (x?.error) {
          this.errorDialogModal = true;
          this.errorDialogSetting.header = this.isEdit
            ? 'Edit request'
            : 'Add new request';
          this.errorDialogSetting.hasError = true;
          this.errorDialogSetting.cancelButton = undefined;
          this.errorDialogSetting.confirmButton = 'Ok';
        } else {
          this.errorDialogModal = false;
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
      assetInfo: this._fb.group({
        asset: [''],
        gpsMeterSource: ['']
      }),
      assetId: ['', Validators.required],
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

  dialogConfirm($event): void {
    this.errorDialogModal = false;
    this.dialogModal = false;
    if (!$event) return;

    if (this.dialogType == 'submit') {
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

        this._bodyShopRequestFacade.editRequest(requestInfo);
      } else {
        requestInfo = {
          ...requestInfo
        };
        this._bodyShopRequestFacade.addRequest(requestInfo);
      }
    } else {
      this._bodyShopRequestFacade.resetParams();
      this._location.back();
    }
  }

  addRequest() {
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    }
    this.dialogModal = true;
    this.dialogType = 'submit';
    if (this.isEdit) {
      this.dialogSetting.header = 'Edit request';
      this.dialogSetting.message =
        'Are you sure you want to submit this changes?';
      this.dialogSetting.isWarning = true;
      this.dialogSetting.confirmButton = 'Yes';
      this.dialogSetting.cancelButton = 'Cancel';
      return;
    } else {
      this.dialogSetting.header = 'Add new request';
      this.dialogSetting.isWarning = true;
      this.dialogSetting.hasError = false;
      this.dialogSetting.message = 'Are you sure you want to add new request?';
      this.dialogSetting.confirmButton = 'OK';
      this.dialogSetting.cancelButton = 'Cancel';
    }
  }

  cancelForm() {
    this.dialogModal = true;
    this.dialogType = 'cancel';
    if (this.isEdit) {
      this.dialogSetting.header = 'Edit request';
      this.dialogSetting.hasError = false;
      this.dialogSetting.isWarning = true;
      this.dialogSetting.message =
        'Are you sure that you want to cancel editing request?';
      this.dialogSetting.confirmButton = 'Yes';
      this.dialogSetting.cancelButton = 'Cancel';
      return;
    }

    this.dialogSetting.header = 'Add new request';
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message =
      'Are you sure that you want to cancel adding new request?';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'Cancel';
  }
  changePriority(statusPriority): void {
    this.activePriority = statusPriority;
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.filesUpdloaded = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {});
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event) {}

  public fileLeave(event) {}

  uploadImage($event) {
    this.profileDocIds = [];
    if (!$event || !$event.files) {
      return;
    }
    this.profileDocIds = $event.files;
  }
}

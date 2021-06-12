import { Component, OnInit, Injector } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';

import { filter, map } from 'rxjs/operators';
import {
  AssetMasterFacade,
  AssetMasterService
} from '@feature/fleet/+state/assets/asset-master';
import { TaskMasterService } from '@feature/workshop/+state/task-master';
import moment from 'moment';
import { Subject, Subscription } from 'rxjs';

import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { ServiceShopJobCardFacade, ServiceShopJobCardService } from '@feature/workshop/+state/service-shop/job-card';
import { ServiceShopRequestFacade, ServiceShopRequestService } from '@feature/workshop/+state/service-shop/request';
import { ServiceShopLocationFacade } from '@feature/workshop/+state/service-shop/location';
import { ServiceShopTechnicianFacade } from '@feature/workshop/+state/service-shop/technician';

@Component({
  selector: 'anms-add-job-card',
  templateUrl: './add-job-card.component.html',
  styleUrls: ['./add-job-card.component.scss']
})
export class AddJobCardServiceShopComponent extends Utility implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  isEdit: boolean = false;
  id: number;
  specificAsset: boolean = false;
  specificAssetId: number;

  assets: any[] = [];
  newAssets: any[];
  assetsSubscription: Subscription;

  //#region Dialog
  dialogModal = false;
  taskFiltered: any[];
  dialogSetting: IDialogAlert = {
    header: 'Add JobCard',
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

  inputForm: FormGroup;
  taskMasters: any[];
  newTaskMasters: any[];
  submited = false;
  filteredJobCard;
  jobCard$: Subscription;
  allJobCards = [];

  selectedItems = [];
  selectedAsset;

  priorities: any[] = [
    {
      id: 1,
      name: '1'
    },
    {
      id: 2,
      name: '2'
    },
    {
      id: 3,
      name: '3'
    },
    {
      id: 4,
      name: '4'
    },
    {
      id: 5,
      name: '5'
    },
    {
      id: 6,
      name: '6'
    },
    {
      id: 7,
      name: '7'
    },
    {
      id: 8,
      name: '8'
    },
    {
      id: 9,
      name: '9'
    },
    {
      id: 10,
      name: '10'
    }
  ];

  addJobCard_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.requests',
        type: 1,
        field: 'request',
        renderer: 'checkboxRenderer'
      },
      { lable: 'tables.column.date', type: 1, sortable: true, field: 'date' },
      { lable: 'tables.column.description', type: 1, field: 'description' },
      { lable: 'tables.column.issue_type', type: 1, field: 'issue_type' },
      {
        lable: 'tables.column.reported_by',
        type: 1,
        field: 'reportedBy'
      },
      {
        lable: 'tables.column.attachment',
        type: 1,
        field: 'attachment',
        renderer: 'downloadButtonRenderer'
      }
    ],
    data: []
  };

  private _jobCard: any;
  assets$ = this._jobCardService.getAllAssethasJobCard().pipe(
    map((y) => {
      console.log(y);
      return y.message.map((x) => ({ id: x.assetId, name: x.dpd }));
    })
  );

  locations$ = this._facadeLocation.serviceShop$.pipe(
    map((y) => y.map((x) => ({ id: x.id, name: x.address })))
  );

  technicians$ = this._facadeTechnician.serviceShop$.pipe(
    map((y) =>
      y.map((x) => ({
        id: x.id,
        name: x.user.firstName + ' ' + x.user.lastName
      }))
    )
  );

  relatedRequests = new Subject();
  relatedRequests$ = this.relatedRequests.asObservable().pipe(
    map((x: any) => {
      if (this.selectedItems.length > 0 && x.length > 0) {
        return x.map((a) => {
          if (this.selectedItems.filter((d) => d.taskMasterId.id == a.id))
            return { ...a, checkbox: true };
          else return { ...a, checkbox: true };
        });
      } else {
        return x;
      }
    })
  );
  // relatedRequests$ = this._facadeRequest.requestsById$.pipe(
  //   map((y) =>
  //     y.map((x) => ({
  //       id: x.id,
  //       request: {
  //         label: x.request,
  //         checkbox: false
  //       },
  //       date: x.createdAt ? moment.utc(x.createdAt).local().format('DD-MM-YYYY') : 'ex: 20-20-2020',
  //       description: x.description,
  //       issue_type: x.jobType,
  //       reportedBy: x.reportedBy,
  //       attachment: x.documentIds
  //     }))
  //   )
  // );

  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private _roter: Router,
    private _facadeJobCard: ServiceShopJobCardFacade,
    private _facadeRequest: ServiceShopRequestFacade,
    private _facadeAsset: AssetMasterFacade,
    private _assetMasterService: AssetMasterService,
    private _facadeLocation: ServiceShopLocationFacade,
    private _facadeTechnician: ServiceShopTechnicianFacade,
    private _jobCardService: ServiceShopJobCardService,
    private _taskMasterService: TaskMasterService,
    private service: ServiceShopRequestService,
    private _activatedRoute: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._facadeRequest.resetParams();
    this._facadeJobCard.loadAll();
    this.selectedAsset = this.route.snapshot.queryParams?.assetId;
    this.jobCard$ = this._facadeJobCard.serviceShop$.subscribe((x) => {
      this.allJobCards = x;
    });
    this._taskMasterService
      .getAllTaks()
      .pipe(
        map((data) => {
          if (data?.message) {
            data.message = data.message.filter(
              (a) => a.shopType == 'SERVICESHOP'
            );
          }
          return data;
        })
      )
      .subscribe((data) => {
        this.taskMasters = data.message.map((t) => ({
          id: t.id,
          name: t.name
        }));
      });
    this._facadeAsset.loadAll();
    this._facadeLocation.loadAll();
    this._facadeTechnician.loadAll();
    this._facadeTechnician.serviceShop$.subscribe((_) => {
      this.buildForm();
    });

    this.assetsSubscription = this._jobCardService
      .getAllAssethasJobCard()
      .pipe(
        map((y) => y.message.map((x) => ({ ...x, id: x.assetId, name: x.dpd })))
      )
      .subscribe((data) => ((this.assets = data), console.log(data)));
    if (
      this._activatedRoute.snapshot.url[
        this._activatedRoute.snapshot.url.length - 1
      ].path === 'add-job-card' &&
      (this._activatedRoute.snapshot.parent.params.id ||
        this.route.snapshot.params.id)
    ) {
      this.specificAsset = true;
      this.specificAssetId = +this._activatedRoute.snapshot.parent.params.id
        ? +this._activatedRoute.snapshot.parent.params.id
        : +this.route.snapshot.params.id;
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
            this.selectAsset({ id: this.specificAssetId });
          }
        });
    }

    //fill asset Id from queryParams
    this.route.queryParams.subscribe((params) => {
      if (params['assetId']) {
        console.log(params['assetId']);
        this.inputForm.controls['assetId'].setValue(+params['assetId']);
        this.selectAsset({ value: params.assetId });
        this.loadRequests(params.assetId);
      }
    });
  }
  private buildForm() {
    this.inputForm = this._fb.group({
      assetId: ['', [Validators.required]],
      description: [''],
      wsLocationId: ['', [Validators.required]],
      relatedRequestIds: [[1]],
      tasks: this._fb.array([this.createTask()])
    });
    this.route.url.subscribe((params) => {
      this.isEdit =
        params.filter((x) => x.path == 'edit-job-card').length > 0
          ? true
          : false;

      if (this.isEdit) {
        this.id = +params[params.length - 1].path;
        this._jobCardService
          .getJobCardById(this.id)
          .pipe(map((x) => x.message))
          .subscribe((x) => {
            if (x) {
              this._jobCard = x;
              this.selectedItems = x.tasks.map((t) => ({
                taskMasterId: {
                  id: t.taskMaster.id,
                  name: t.taskMaster.name
                },
                priorityOrder: t.priorityOrder,
                technicianId:
                  t.technician
                    .id /* {
                  id: t.technician.id,
                  name: t.technician.firstName + " " + t.technician.lastName
                } */
              }));

              this.inputForm.patchValue({
                assetId: { id: x.assetId, name: x.assetDpd },
                description: x.description,
                wsLocationId: x.location.id
              });
              const task = <FormArray>this.inputForm.get('tasks');
              for (let index = 0; index < x.tasks.length; index++) {
                task.controls[index].patchValue({
                  taskMasterId: {
                    id: x.tasks[index].taskMaster.id,
                    name: x.tasks[index].taskMaster.name
                  },
                  priorityOrder: x.tasks[index].priorityOrder,
                  technicianId: x.tasks[index].technician.id
                });
                if (index === x.tasks.length - 1) {
                  break;
                }
                this.addTask();
              }
              if (task.controls.length > x.tasks.length) {
                task.removeAt(task.controls.length - 1);
              }

              this.tasks.controls[0].markAsDirty();

              // this.task.controls[0].patchValue({
              //   task: x.tasks
              // });
            }
            this.inputForm.get('description').markAsDirty();
            this.inputForm.get('wsLocationId').markAsDirty();
          });
      } else {
      }
    });

    this._facadeJobCard.submitted$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogType = 'success';
        this.dialogSetting.header = this.isEdit
          ? 'Edit jobCard'
          : 'Add new jobCard';
        this.dialogSetting.message = this.isEdit
          ? 'Changes Saved Successfully'
          : 'JobCard Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'Yes';
        this.dialogSetting.cancelButton = undefined;
      }
    });

    this._facadeJobCard.error$.subscribe((x) => {
      if (x?.error) {
        this.errorDialogModal = true;
        this.errorDialogSetting.header = this.isEdit
          ? 'Edit jobCard'
          : 'Add new jobCard';
        this.errorDialogSetting.hasError = true;
        this.errorDialogSetting.cancelButton = undefined;
        this.errorDialogSetting.confirmButton = 'Ok';
      } else {
        this.errorDialogModal = false;
      }
    });
  }

  // searchJobCard(event) {
  //   let filtered: any[] = [];
  //   let query = event.query;
  //   for (let i = 0; i < this.jobCardID.length; i++) {
  //     let jobCard = this.jobCardID[i];
  //     if (jobCard.id.toLowerCase().indexOf(query.toLowerCase()) == 0) {
  //       filtered.push(jobCard);
  //     }
  //   }
  //   this.filteredJobCard = filtered;
  // }

  loadRequests(assetId) {
    console.log(assetId);
    this.relatedRequests.next([]);

    this.service
      .requestsById(assetId)
      .pipe(
        map((y) => {
          let a = y.message;
          return a.map((x) => ({
            id: x.id,
            request: {
              label: x.request,
              checkbox: false
            },
            date: x.createdAt
              ? moment.utc(x.createdAt).local().format('DD-MM-YYYY')
              : 'ex: 20-20-2020',
            description: x.description,
            issue_type: x.jobType,
            reportedBy: x.reportedBy,
            attachment: x.documentIds
          }));
        })
      )
      .subscribe((x) => {
        this.relatedRequests.next(x);
      });
  }

  autocompleteValidationJobCardID(input: FormControl) {
    const inputValid = input.value.id;
    if (inputValid) {
      return null;
    } else {
      return { needsExclamation: true };
    }
  }

  assetIdSelected: number = null;
  requests$ = this._facadeRequest.requestsById$;

  selectAsset(e) {
    console.log(e);
    this.relatedRequests.next([]);
    if (e.hasOpenJobCard) {
      this.errorDialogSetting.header = 'Job Card';
      this.errorDialogSetting.message =
        "Asset has alredy a job card, you can't add more than once!";
      this.errorDialogSetting.hasError = true;
      this.errorDialogSetting.cancelButton = undefined;
      this.errorDialogSetting.confirmButton = 'Ok';
      this.errorDialogModal = true;
      this.inputForm.patchValue({
        assetId: ''
      });
      this._facadeJobCard.resetParams();
    } else {
      console.log(e.id);
      this.assetIdSelected = e.id;
      this.loadRequests(e.id);
    }
  }
  get tasks(): FormArray {
    return this.inputForm.get('tasks') as FormArray;
  }

  searchAsset(event) {
    let copyAssets = [];
    copyAssets = this.assets.slice();
    this.newAssets = copyAssets.filter((a) => a.name.includes(event.query));
  }

  createTask(): FormGroup {
    return this._fb.group({
      taskMasterId: ['', [Validators.required]],
      priorityOrder: ['', [Validators.required]],
      technicianId: ['', [Validators.required]]
    });
  }

  addTask() {
    const task = <FormArray>this.inputForm.get('tasks');

    if (task.invalid) {
      return;
    }

    task.push(this.createTask());
  }

  dialogConfirm($event): void {
    this.errorDialogModal = false;
    this.dialogModal = false;
    if (!$event) return;

    if (this.dialogType == 'submit') {
      let f = this.inputForm.value;

      let jobCardInfo: any = {
        description: f.description,
        wsLocationId: f.wsLocationId,
        relatedRequestIds: f.relatedRequestIds,
        tasks: f.tasks.map((t) => ({
          priorityOrder: t.priorityOrder,
          taskMasterId: t.taskMasterId.id,
          technicianId: t.technicianId
        }))
      };

      if (this.isEdit) {
        jobCardInfo = {
          ...jobCardInfo,
          id: this.id
        };

        this._facadeJobCard.editJobCard(jobCardInfo);
      } else {
        jobCardInfo = {
          ...jobCardInfo
        };
        this._facadeJobCard.addJobCard(jobCardInfo, f.assetId.assetId);
      }
    } else {
      this.router
        .navigate(['/workshop/service-shop'], {
          queryParams: { id: 'jobcardTab' }
        })
        .then((_) => {
          this._facadeJobCard.resetParams();
        });
    }
  }
  addRequest() {
    this.submited = true;
    if (this.inputForm.invalid) {
      this.inputForm.markAllAsTouched();
      return;
    }

    this.dialogModal = true;
    this.dialogType = 'submit';
    if (this.isEdit) {
      this.dialogSetting.header = 'Edit jobCard';
      this.dialogSetting.message =
        'Are you sure you want to submit this changes?';
      this.dialogSetting.isWarning = true;
      this.dialogSetting.confirmButton = 'Yes';
      this.dialogSetting.cancelButton = 'Cancel';
      return;
    } else {
      this.dialogSetting.header = 'Add new jobCard';
      this.dialogSetting.isWarning = true;
      this.dialogSetting.hasError = false;
      this.dialogSetting.message = 'Are you sure you want to add new jobCard?';
      this.dialogSetting.confirmButton = 'OK';
      this.dialogSetting.cancelButton = 'Cancel';
    }
  }
  removeTask(index) {
    this.tasks.removeAt(index);
  }

  // searchTaskMaster(event) {
  //   let copyAssets = [];
  //   copyAssets = this.taskMasters.slice();
  //   this.newTaskMasters = copyAssets.filter((a) =>
  //     a.name.includes(event.query)
  //   );
  // }

  searchTaskMaster(event) {
    let query = event.query;

    let filtered = [];
    for (let index = 0; index < this.taskMasters.length; index++) {
      let task = this.taskMasters[index];
      if (task.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(task);
      }
    }
    this.taskFiltered = filtered;
  }

  cancelForm() {
    this.dialogModal = true;
    this.dialogType = 'cancel';
    if (this.isEdit) {
      this.dialogSetting.header = 'Edit jobCard';
      this.dialogSetting.hasError = false;
      this.dialogSetting.isWarning = true;
      this.dialogSetting.message =
        'Are you sure that you want to cancel editing jobCard?';
      this.dialogSetting.confirmButton = 'Yes';
      this.dialogSetting.cancelButton = 'Cancel';
    }

    this.dialogSetting.header = 'Add new jobCard';
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message =
      'Are you sure that you want to cancel adding new jobCard?';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'Cancel';
  }

  get task(): FormArray {
    return this.inputForm.get('task') as FormArray;
  }

  getSelectedRequestIds(event) {
    this.inputForm.patchValue({
      relatedRequestIds: event
    });
  }
}

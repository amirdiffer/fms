import { Component, OnInit, Injector } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnType, TableSetting } from '@core/table';
import { ButtonType } from '@core/table/table.component';
import { Utility } from '@shared/utility/utility';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import {
  BodyShopJobCardFacade,
  BodyShopJobCardService,
  BodyShopLocationFacade,
  BodyShopRequestFacade,
  BodyShopTechnicianFacade,
  BodyShopTechnicianService,
  BodyShopRequestService
} from '@feature/workshop/+state/body-shop';
import { map } from 'rxjs/operators';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master';
import { TaskMasterService } from '@feature/workshop/+state/task-master';
import moment from 'moment';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'anms-add-job-card',
  templateUrl: './add-job-card.component.html',
  styleUrls: ['./add-job-card.component.scss']
})
export class AddJobCardComponent extends Utility implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  isEdit: boolean = false;
  id: number;
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
  priorities: any[] = [
    {
      id: 1,
      name: 'Priority ID 1'
    },
    {
      id: 2,
      name: 'Priority ID 2'
    },
    {
      id: 3,
      name: 'Priority ID 3'
    },
    {
      id: 4,
      name: 'Priority ID 4'
    },
    {
      id: 5,
      name: 'Priority ID 5'
    },
    {
      id: 6,
      name: 'JobCard ID 6'
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

  assets$ = this._jobCardService
    .getAllAssethasJobCard()
    .pipe(map((y) => y.message.map((x) => ({ id: x.assetId, name: x.dpd }))));
  locations$ = this._facadeLocation.bodyShop$.pipe(
    map((y) => y.map((x) => ({ id: x.id, name: x.address })))
  );
  technicians$ = this._facadeTechnician.bodyShop$.pipe(
    map((y) =>
      y.map((x) => ({
        id: x.id,
        name: x.user.firstName + ' ' + x.user.lastName
      }))
    )
  );

  relatedRequests = new Subject();
  relatedRequests$ = this.relatedRequests.asObservable();

  selectedAsset;
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
    private _facadeJobCard: BodyShopJobCardFacade,
    private _facadeRequest: BodyShopRequestFacade,
    private _facadeAsset: AssetMasterFacade,
    private _facadeLocation: BodyShopLocationFacade,
    private _facadeTechnician: BodyShopTechnicianFacade,
    private _jobCardService: BodyShopJobCardService,
    private _taskMasterService: TaskMasterService,
    private service: BodyShopRequestService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    // this.relatedRequests$ = this._facadeRequest.assetRequest$.subscribe()
    this.selectedAsset = this.route.snapshot.queryParams?.assetId;
    if (this.selectedAsset) {
      this.selectAsset({ value: this.selectedAsset })
      this.loadAssetRequests(this.selectedAsset);
    }

    this._facadeRequest.resetParams();
    this._facadeJobCard.loadAll();
    this.jobCard$ = this._facadeJobCard.bodyShop$.subscribe((x) => {
      this.allJobCards = x;
    });

    this._taskMasterService.getAllTaks().subscribe((data) => {
      this.taskMasters = data.message.map((t) => ({
        id: t.id,
        name: t.name
      }));
    });
    this._facadeAsset.loadAll();
    this._facadeLocation.loadAll();
    this._facadeTechnician.loadAll();
    this.buildForm();
    //fill asset Id from queryParams
    this.route.queryParams.subscribe((params) => {
      if (params['assetId']) {
        this.inputForm.controls['assetId'].setValue(+params['assetId']);
      }
    });
  }

  private loadAssetRequests(assetId) {
    this.relatedRequests.next([]);
    this.service.requestsById(assetId).pipe(
      map((y) => {
        let a = y.message;
        return a.map((x) => ({
          id: x.id,
          request: {
            label: x.request,
            checkbox: false
          },
          date: x.createdAt
            ? moment.utc(x.createdAt * 1000).local().format('DD-MM-YYYY')
            : '',
          description: x.description,
          issue_type: x.jobType,
          reportedBy: x.reportedBy,
          attachment: x.documentIds
        }))
      }
      )
    ).subscribe(x => {
      this.relatedRequests.next(x);
    });
  }

  private buildForm() {
    this.inputForm = this._fb.group({
      assetId: ['', [Validators.required]],
      description: [''],
      wsLocationId: ['', [Validators.required]],
      relatedRequestIds: [],
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
              this.inputForm.patchValue({
                assetId: x.assetId,
                description: x.description,
                wsLocationId: x.location.id,
                tasks: x.tasks.map((t) => ({
                  taskMasterId: {
                    id: t.taskMaster.id,
                    name: t.taskMaster.name
                  },
                  priorityOrder: t.priorityOrder,
                  technician: t.technicianId
                }))
              });
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
    this._facadeJobCard.resetParams();
    if (this.allJobCards.find((jobcard) => jobcard.assetId == e.value)) {
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
    } else {
      this.assetIdSelected = e.value;

      this.loadAssetRequests(e.value);
      // this._facadeRequest.getAssetRequest(e.value);
    }
  }
  get tasks(): FormArray {
    return this.inputForm.get('tasks') as FormArray;
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
        this._facadeJobCard.addJobCard(jobCardInfo, f.assetId);
      }
    } else {
      this.router
        .navigate(['/workshop/body-shop'], {
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

  searchInTable($event) {
    console.log($event);
  }
}

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

import { map, tap } from 'rxjs/operators';
import {
  AssetMasterFacade,
  AssetMasterService
} from '@feature/fleet/+state/assets/asset-master';
import { TaskMasterService } from '@feature/workshop/+state/task-master';
import moment from 'moment';
import { Observable, Subject, Subscription } from 'rxjs';
import { AssetSearchThroughFacade } from '@feature/fleet/+state/assets/search-through';
import { BodyShopJobCardFacade, BodyShopJobCardService } from '@feature/workshop/+state/body-shop/job-card';
import { BodyShopRequestFacade, BodyShopRequestService } from '@feature/workshop/+state/body-shop/request';
import { BodyShopLocationFacade } from '@feature/workshop/+state/body-shop/location';
import { BodyShopTechnicianFacade } from '@feature/workshop/+state/body-shop/technician';
import { DialogService } from '@core/dialog/dialog-template.component';

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
  specificAsset: boolean = false;
  specificAssetId: number;
  //#region Dialog
  dialogModal = false;
  taskFiltered: any[];

  assets: any[] = [];
  newAssets: any[];

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

  assetsSubscription: Subscription;

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

  requestData$: Observable<any>;

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
    private _assetMasterService: AssetMasterService,
    private _facadeLocation: BodyShopLocationFacade,
    private _facadeTechnician: BodyShopTechnicianFacade,
    private _jobCardService: BodyShopJobCardService,
    private _taskMasterService: TaskMasterService,
    private service: BodyShopRequestService,
    private _activatedRoute: ActivatedRoute,
    private _dialogService : DialogService,
    private _assetSearchThrough: AssetSearchThroughFacade,

  ) {
    super(injector);
    this._facadeJobCard.resetParams()
  }

  ngOnInit(): void {
    // this.relatedRequests$ = this._facadeRequest.assetRequest$.subscribe()
    this.selectedAsset = this.route.snapshot.queryParams?.assetId;
    if (this.selectedAsset) {
      this.selectAsset({ value: this.selectedAsset });
      this.loadAssetRequests(this.selectedAsset);
    }
    this._assetSearchThrough.loadAvailableAssetForAddingJobCard();
    this.assetsSubscription =this._assetSearchThrough.searchAsset$.subscribe(
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


    this._facadeRequest.resetParams();
    this._facadeJobCard.loadAll();
    this.jobCard$ = this._facadeJobCard.bodyShop$.subscribe((x) => {
      this.allJobCards = x;
    });

    this._taskMasterService
      .getAllTaks()
      .pipe(
        map((data) => {
          if (data?.message) {
            data.message = data.message.filter((a) => a.shopType == 'BODYSHOP');
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
    this._facadeTechnician.bodyShop$.subscribe((_) => {
      this.buildForm();
    });

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
        this.inputForm.controls['assetId'].setValue(+params['assetId']);
      }
    });
  }

  private loadAssetRequests(assetId) {
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
              ? moment
                  .utc(x.createdAt * 1000)
                  .local()
                  .format('DD-MM-YYYY')
              : '',
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

  private buildForm() {
    this.inputForm = this._fb.group({
      assetId: ['', [Validators.required]],
      description: [''],
      wsLocationId: ['', [Validators.required]],
      relatedRequestIds: [[1]],
      tasks: this._fb.array([this.createTask()])
    });
    this.inputForm.controls['tasks'].markAsUntouched();
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
                task.removeAt(this.tasks.controls.length - 1);
              }
            }
            this.inputForm.get('description').markAsDirty();
            this.inputForm.get('wsLocationId').markAsDirty();
          });
      } else {
      }
    });

    this._facadeJobCard.submitted$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('success' ,
        (this.isEdit ? 'Edit jobCard': 'Add new jobCard' ),
        (this.isEdit ? 'Changes Saved Successfully' : 'jobCard Added Successfully'),'Ok')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
            this.router.navigate(['/workshop/body-shop'] , { queryParams: { id: 'jobcardTab' }}).then(()=>{
              this._facadeJobCard.loadAll();
            });
          }
          dialogClose$?.unsubscribe();
          })
        ).subscribe()


        this._facadeJobCard.loadAll();
      }
    });

    this._facadeJobCard.error$.subscribe((x) => {
      if (x?.error) {
        const dialog = this._dialogService.show('danger' ,
          (this.isEdit ? 'Edit jobCard': 'Add new jobCard' ),
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
  }

  searchAsset(event) {
    let copyAssets = [];
    copyAssets = this.assets.slice();
    this.newAssets = copyAssets.filter((a) => a.name.includes(event.query));
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
    this.relatedRequests.next([]);
    if (e.hasOpenJobCard) {
      const dialog = this._dialogService.show('danger' , 'Asset has alredy a job card' , "You can't add more than once! Please select another asset." , 'Ok')
      const dialogClose$:Subscription = dialog.dialogClosed$
      .pipe(
        tap((result) => {
        if (result === 'confirm') {
        }
        dialogClose$?.unsubscribe();
        })
      ).subscribe();
      this.inputForm.patchValue({
        assetId: ''
      });
      this._facadeJobCard.resetParams();
    } else {
      this.assetIdSelected = e.id;
      this.loadAssetRequests(e.id);
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

  addRequest() {
    this.submited = true;
    if (this.inputForm.invalid) {
      this.inputForm.markAllAsTouched();
      return;
    }

    const dialog = this._dialogService.show('warning' ,
              (this.isEdit ? 'Edit jobCard' : 'Add new jobCard') ,
              (this.isEdit ? 'Are you sure you want to submit this changes?' : 'Are you sure you want to add new jobCard?') , 'Yes','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
    .pipe(
      tap((result) => {
      if (result === 'confirm') {
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
          this._facadeJobCard.addJobCard(jobCardInfo, this.assetIdSelected);
      }
      }
      dialogClose$?.unsubscribe();
      })
    ).subscribe();
    this._facadeJobCard.resetParams();
  }
  removeTask(index) {
    this.tasks.removeAt(index);
  }

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
    const dialog = this._dialogService.show('warning' , 'Are you sure you want to leave?' , 'You have unsaved changes! If you leave, your changes will be lost.' , 'Yes','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
    .pipe(
      tap((result) => {
      if (result === 'confirm') {
        this.router.navigate(['/workshop/body-shop'] , { queryParams: { id: 'jobcardTab' }});
      }
      dialogClose$?.unsubscribe();
      })
    ).subscribe();

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
  }
}

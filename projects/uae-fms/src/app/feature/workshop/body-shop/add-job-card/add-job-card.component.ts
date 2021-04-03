import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { TableSetting } from '@core/table';
import { ButtonType } from '@core/table/table.component';
import { Utility } from '@shared/utility/utility';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import {
  BodyShopJobCardFacade,
  BodyShopJobCardService,
  BodyShopLocationFacade,
  BodyShopTechnicianFacade,
  BodyShopTechnicianService
} from '@feature/workshop/+state/body-shop';
import { map } from 'rxjs/operators';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master';

@Component({
  selector: 'anms-add-job-card',
  templateUrl: './add-job-card.component.html',
  styleUrls: ['./add-job-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddJobCardComponent extends Utility implements OnInit {
  isEdit: boolean = false;
  id: number;
  //#region Dialog
  dialogModal = false;

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
  submited = false;
  filteredJobCard;
  priorities: any[] = [
    {
      id: '1',
      name: 'Priority ID 1'
    },
    {
      id: '2',
      name: 'Priority ID 2'
    },
    {
      id: '3',
      name: 'Priority ID 3'
    },
    {
      id: '4',
      name: 'Priority ID 4'
    },
    {
      id: '5',
      name: 'Priority ID 5'
    },
    {
      id: '6',
      name: 'JobCard ID 6'
    }
  ];
  addJobCard_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.jobCard_id', type: 1, field: 'JobCard_ID' },
      { lable: 'tables.column.services', type: 1, field: 'Services' },
      { lable: 'tables.column.jobCard', type: 1, field: 'JobCard' },
      { lable: 'tables.column.task', type: 1, field: 'Section' },
      {
        lable: 'tables.column.job_card',
        type: 1,
        field: 'Job_Card',
        sortable: true
      },
      {
        lable: 'tables.column.technician',
        type: 1,
        field: 'Technician',
        sortable: true
      },
      {
        lable: 'tables.column.assets',
        type: 1,
        field: 'Assets',
        sortable: true
      },
      {
        lable:
          '<img src="../../../../../assets/icons/ellipsis-v.svg" class="icon24px">',
        type: 3,
        width: 70,
        isIconLable: true,
        field: 'addButton',
        renderer: 'button',
        buttonType: ButtonType.add
      }
    ],
    data: [
      {
        JobCard_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        JobCard: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        JobCard_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        JobCard: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        JobCard_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        JobCard: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        JobCard_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        JobCard: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        JobCard_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        JobCard: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        JobCard_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        JobCard: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      }
    ]
  };
  private _jobCard: any;
  assets$ = this._facadeAsset.assetMaster$.pipe(
    map((y) => y.map((x) => ({ id: x.id, name: x.dpd })))
  );
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

  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private _roter: Router,
    private _facadeJobCard: BodyShopJobCardFacade,
    private _facadeAsset: AssetMasterFacade,
    private _facadeLocation: BodyShopLocationFacade,
    private _facadeTechnician: BodyShopTechnicianFacade,
    private _jobCardService: BodyShopJobCardService,
    private changeDetector: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._facadeAsset.loadAll();
    this._facadeLocation.loadAll();
    this._facadeTechnician.loadAll();
    this.buildForm();
  }
  private buildForm() {
    this.inputForm = this._fb.group({
      assetId: ['', [Validators.required]],
      description: [''],
      wsLocationId: ['', [Validators.required]],
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
                description: x.description,
                wsLocationId: x.location.id
              });
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
      console.log('Submit : ', x);
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
        this.changeDetector.detectChanges();
      }
    });

    this._facadeJobCard.error$.subscribe((x) => {
      if (x?.error) {
        console.log(x?.error);
        this.errorDialogModal = true;
        this.errorDialogSetting.header = this.isEdit
          ? 'Edit jobCard'
          : 'Add new jobCard';
        this.errorDialogSetting.hasError = true;
        this.errorDialogSetting.cancelButton = undefined;
        this.errorDialogSetting.confirmButton = 'Ok';
        this.changeDetector.detectChanges();
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

  createTask(): FormGroup {
    return this._fb.group({
      taskMasterId: ['1', [Validators.required]],
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
      console.log(this._jobCard);
      let jobCardInfo: any = {
        description: f.description,
        wsLocationId: f.wsLocationId,
        tasks: f.tasks.map((t) => ({
          priorityOrder: t.priorityOrder,
          taskMasterId: 1,
          technicianId: t.technicianId
        }))
      };

      if (this.isEdit) {
        jobCardInfo = {
          ...jobCardInfo,
          id: this.id
        };

        console.log(jobCardInfo);
        this._facadeJobCard.editJobCard(jobCardInfo);
      } else {
        jobCardInfo = {
          ...jobCardInfo
        };
        this._facadeJobCard.addJobCard(jobCardInfo, f.assetId);
      }
    } else {
      this.router.navigate(['/workshop/body-shop']).then((_) => {
        this._facadeJobCard.resetParams();
      });
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
      return;
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
}

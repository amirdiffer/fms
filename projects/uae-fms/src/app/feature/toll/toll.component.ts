import { Component, OnDestroy, OnInit } from '@angular/core';
import { TollFacade } from '../toll/+state';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { IToll } from '@models/toll';

@Component({
  selector: 'anms-toll',
  templateUrl: './toll.component.html',
  styleUrls: ['./toll.component.scss']
})
export class TollComponent implements OnInit, OnDestroy {
  tableSetting;
  filterSetting = [];
  statistic$: Subscription;
  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn = 'assets/icons/download-solid.svg';
  assignForm: object | null = null;
  loaded: boolean = false;

  submittedAssign = false;

  translations = {
    'statistic.total': '',
    'statistic.available': '',
    'statistic.assigned': ''
  };

  form: FormGroup;
  migrateForm(): void {
    this.form = this._fb.group({
      id: ['', Validators.compose([Validators.required])],
      tollTag: ['', Validators.compose([Validators.required])],
      assetId: [null, Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])],
      purchaseDate: ['', Validators.compose([Validators.required])]
    });
  }

  constructor(private facade: TollFacade, private _fb: FormBuilder) {
    this.migrateForm();
  }

  ngOnInit(): void {
    this.tableSetting = {
      columns: [
        {
          lable: 'tables.column.toll_tag',
          field: 'tollTag',
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.status',
          field: 'status',
          type: 1,
          thumbField: '',
          renderer: ''
        },
        /* {
          lable: 'sidebar.fleets.assets',
          field: 'relatedAsset',
          type: 2,
          thumbField: '',
          renderer: 'assignNow'
        }, */
        {
          lable: 'tables.column.purshate_date',
          field: 'purchaseDate',
          type: 1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: []
    };
    this.filterSetting = [
      {
        filterTitle: 'statistic.total',
        filterCount: '',
        filterTagColor: '#CBA786',
        field: 'total'
      },
      {
        filterTitle: 'statistic.available',
        filterCount: '',
        filterTagColor: '#00AFB9',
        field: 'available'
      },
      {
        filterTitle: 'statistic.assigned',
        filterCount: '',
        filterTagColor: '#EF959D',
        field: 'assigned'
      }
    ];
    this.facade.loadAll();
    this.facade.toll$.subscribe((data) => {
      if (data) {
        this.tableSetting.data = data.map((item) => {
          return {
            id: item.id,
            purchaseDate: item.purchaseDate,
            // dpd: item.relatedAsset.dpd,
            // dpdId: item.relatedAsset.id,
            relatedAsset: {
              dpd: item.relatedAsset.dpd,
              id: item.relatedAsset.id
            },
            status: item.status,
            tollTag: item.tollTag
          };
        });
      }
    });
    this.facade.assignNow$.subscribe((x) => {
      this.assignForm = x;
      if (x != null && x.id) {
        this.form.patchValue(this.assignForm);
        this.form.get('assetId').patchValue(x['relatedAsset']['id']);
      }
    });
    this.facade.statistic$.subscribe((data) => {
      if (data) {
        this.filterSetting.forEach((card, index) => {
          this.filterSetting[index].filterCount =
            data[this.filterSetting[index].field];
        });
      }
    });
    this.facade.loaded$.subscribe((loaded) => {
      this.facade.loadAssignNow(null);
      this.loaded = loaded;
    });
  }

  closeForm(): void {
    this.form.reset();
    this.facade.loadAssignNow(null);
  }

  lengthObjectAssign(): boolean {
    if (this.assignForm == null) return false;
    else return Object.keys(this.assignForm).length > 1;
  }

  hasError(controlName) {
    const control: FormControl = this.form.get(controlName) as FormControl;

    if (control.dirty && control.invalid) {
      return true;
    }

    return false;
  }

  assignToll(): void {
    this.submittedAssign = true;
    if (this.form.invalid) return;
    this.facade.assigningToll(this.form.getRawValue());
  }

  ngOnDestroy(): void {}
}

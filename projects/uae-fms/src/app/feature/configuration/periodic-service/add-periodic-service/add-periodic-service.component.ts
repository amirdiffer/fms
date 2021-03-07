import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnDifinition, ColumnType, TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';
import { PeriodicServiceFacade } from '../../+state/periodic-service';

@Component({
  selector: 'anms-add-periodic-service',
  templateUrl: './add-periodic-service.component.html',
  styleUrls: ['./add-periodic-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPeriodicServiceComponent extends Utility implements OnInit {
  tableColumns: ColumnDifinition[] = [
    {
      lable: 'tables.column.periodic_service_name',
      field: 'periodicServiceName',
      type: ColumnType.lable
    },
    {
      lable:
        '<img src="../../../../../assets/icons/car-solid.svg" class="icon24px">',
      field: 'number',
      isIconLable: true,
      sortable: true,
      width: 100,
      type: ColumnType.lable
    }
  ];

  tableData = [
    {
      periodicServiceName: 'Basic Vehicle Maintenance',
      number: '21'
    },
    {
      periodicServiceName: 'Basic Vehicle Maintenance',
      number: '21'
    },
    {
      periodicServiceName: 'Basic Vehicle Maintenance',
      number: '21'
    }
  ];

  units = [
    { id: 1, name: 'Km/h' },
    { id: 2, name: 'Km/m' },
    { id: 3, name: 'Km/s' }
  ];

  tableSetting: TableSetting = {
    columns: this.tableColumns,
    data: this.tableData
  };

  addPeriodicServiceForm: FormGroup;
  submited: boolean = false;

  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private facade: PeriodicServiceFacade
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.addPeriodicServiceForm = this._fb.group({
      name: ['', [Validators.required]],
      packageName: ['', [Validators.required]],
      intervals: [''],
      task: ['', [Validators.required]]
    });
  }

  submit() {
    this.submited = true;
    if (this.addPeriodicServiceForm.invalid) {
      return;
    }

    const formValues = this.addPeriodicServiceForm.value;

    const objectToPost = {
      name: formValues.name,
      intervalType: 'km/h',
      intervalValue: formValues.intervals,
      tasks: [formValues.task]
    };

    this.facade.addPeriodicService(objectToPost);

    this.goToList();
  }
}

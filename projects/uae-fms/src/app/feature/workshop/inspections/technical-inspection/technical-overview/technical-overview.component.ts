import { Component, OnInit } from '@angular/core';
import { ColumnType, TableSetting } from '@core/table';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'anms-technical-overview',
  templateUrl: './technical-overview.component.html',
  styleUrls: ['./technical-overview.component.scss']
})
export class TechnicalOverviewComponent implements OnInit {

  setting: TableSetting = {
    columns: [
      {
        lable: 'tables.column.task',
        field: 'task',
        width: 150
      },
      { lable: 'tables.column.request_type', field: 'request_type', width: 100 },
      { lable: 'tables.column.spare_part', field: 'spare_part', width: 100 },
      { lable: 'tables.column.working_hours', field: 'working_hours', width: 100 },
      {
        lable: 'tables.column.total',
        field: 'total',
        width: 100,
        sortable: true
      }
    ],
    data: [
      {
        task: "Oil Leaking",
        request_type: 'Request Type',
        spare_part: 'Filter',
        working_hours: '12 hours',
        total: '2000 AED'
      },
      {
        task: "Oil Leaking",
        request_type: 'Request Type',
        spare_part: 'Filter',
        working_hours: '12 hours',
        total: '2000 AED'
      },
      {
        task: "Oil Leaking",
        request_type: 'Request Type',
        spare_part: 'Filter',
        working_hours: '12 hours',
        total: '2000 AED'
      },
      {
        task: "Oil Leaking",
        request_type: 'Request Type',
        spare_part: 'Filter',
        working_hours: '12 hours',
        total: '2000 AED'
      }
    ]
  };

  status = [
    { name: 'Category 1', id: 1 },
    { name: 'Category 2', id: 2 },
    { name: 'Category 3', id: 3 },
    { name: 'Category 4', id: 4 },
    { name: 'Category 5', id: 5 }
  ];

  constructor(
    private _fb: FormBuilder,
  ) { }

  formGroup: FormGroup;
  activeForm = false;

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      technical_name: [''],
      status: [''],
      manager_name: [''],
      decision: [''],
      description: [''],
      request: new FormArray([this.createRequest()]),
      spare_part: new FormArray([this.createSparePart()]),
      working_hours: [''],
      rate_per_hour: [''],
    });
  }

  createRequest(): FormGroup {
    return this._fb.group({
      task: [''],
      requestType: ['']
    })
  }
  get requestFormArr(): FormArray {
    return this.formGroup.get('request') as FormArray;
  }
  addRequestFormArr(): void {
    if (this.requestFormArr.valid) {
      this.requestFormArr.push(this.createRequest());
    }
  }

  createSparePart(): FormControl {
    return this._fb.control('')
  }
  get getSparePart(): FormArray {
    return this.formGroup.get('spare_part') as FormArray;
  }
  addSparePart(): void {
    const sparePart = new FormControl(null);
    (<FormArray>this.formGroup.get('spare_part')).push(
      sparePart
    );
  }
  removeSparePart(i): void {
    this.getSparePart.removeAt(i);
  }

}

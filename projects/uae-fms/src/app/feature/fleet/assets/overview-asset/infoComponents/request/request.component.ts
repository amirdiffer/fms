import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnType } from '@core/table';
import { BodyShopJobCardService, BodyShopRequestService } from '@feature/workshop/+state/body-shop';
import moment from 'moment';
import { AssetMasterService } from '@feature/fleet/+state/assets/asset-master';

@Component({
  selector: 'app-asset-overview-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private bodyShopJobCardService: BodyShopJobCardService,
    private assetMasterService: AssetMasterService
  ) {}

  @Input() assetID;

  listActiveJobCard = [];
  detailsJobCard;

  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  inputForm: FormGroup;
  submitted = false;

  jobCard_Table1 = {
    columns: [
      {
        lable: 'tables.column.task',
        field: 'task',
        type: ColumnType.lable,
        thumbField: ''
      },
      {
        lable: 'tables.column.priority',
        field: 'priority',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.duration',
        field: 'duration',
        width: 130,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.status',
        field: 'Status',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.start_date',
        field: 'start_date',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'dateRenderer'
      },
      {
        lable: 'tables.column.technician',
        field: 'technician',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.cost',
        field: 'cost',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: '',
        sortable: true
      },
      {
        lable: 'tables.column.part_cost',
        field: 'part_cost',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.total_cost',
        field: 'total_cost',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: '',
        sortable: true
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      floatButton: [
        {
          button: 'external',
          onClick: (col, data, button) => {
            if (button == 'external') {
              this.section = 'detail-box';
              this.getDetailsActiveJobCard(data.id)
            }
            // this.router.navigate(['/fleet/assets/' + data.id]);
          }
        }
      ]
    }
  };

  jobCard_Table2 = {
    columns: [
      {
        lable: 'tables.column.start_date',
        field: 'start_date',
        type: ColumnType.lable,
        thumbField: ''
      },
      {
        lable: 'tables.column.end_date',
        field: 'end_date',
        width: 130,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.duration',
        field: 'duration',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.actual_end_date',
        field: 'actual_end_date',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.delay',
        field: 'delay',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.status',
        field: 'Status',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'statusRenderer'
      },
      {
        lable: 'tables.column.technician',
        field: 'technician',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.cost',
        field: 'cost',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: '',
        sortable: true
      },
      {
        lable: 'tables.column.part_cost',
        field: 'part_cost',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.total_cost',
        field: 'total_cost',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: '',
        sortable: true
      }
    ],
    data: [],
    rowSettings: {
      floatButton: []
    }
  };

  jobCard_Table3 = {
    columns: [
      {
        lable: 'tables.column.request',
        field: 'issue',
        type: ColumnType.lable,
        thumbField: ''
      },
      {
        lable: 'tables.column.date',
        field: 'date',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'dateRenderer'
      },
      {
        lable: 'tables.column.description',
        field: 'description',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.status',
        field: 'Status',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'statusRenderer'
      },
      {
        lable: 'tables.column.request_type',
        field: 'issue_type',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.reported_by',
        field: 'reported_by',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.attachment',
        field: 'attachment',
        type: ColumnType.lable,
        renderer: 'downloadButtonRenderer'
      }
    ],
    data: [],
    rowSettings: {
      floatButton: []
    }
  };

  section = 'list';
  showSection(section: string): void {
    this.section = section;
  }

  submitRequest(section: string) {
    this.submitted = true;
    if (this.inputForm.invalid) {
      return;
    } else {
      this.section = section;
    }
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      issueType: [''],
      reason: [false],
      accidentOption: ['miner'],
      jobType: [''],
      issue: ['', Validators.required],
      createdBy: ['', Validators.required],
      description: ['', Validators.required],
      file: ['']
    });

    this.assetMasterService.getActiveJobCardByAssetID(this.assetID).subscribe(x => {
      let data = x.message['tasks'];
      this.listActiveJobCard = data;
      this.jobCard_Table1.data = (<Array<object>>data).map(d => {
        return {
          id: d['id'],
          task: d['taskMaster']['name'],
          priority: d['priorityOrder'],
          duration: d['taskMaster']['timeEstimate'],
          Status: d['status'],
          start_date: d['startDate'],
          technician: d['technician']['firstName'] + ' ' + d['technician']['lastName'],
          cost: d['cost'] + ' AED',
          part_cost: d['partCost'] + ' AED',
          total_cost: '4700 AED'
        }
      })
    });
    this.assetMasterService.getJobCardByAssetID(this.assetID).subscribe(x => {
      let data = x.message;
      this.jobCard_Table2.data = (<Array<object>>data).map(d => {
        return {
          start_date: d['startDate'],
          end_date: d['endDate'],
          duration: this.diffDate(d['startDate'], d['endDate']) + ' Hours',
          actual_end_date: d['start_date'],
          delay: d['start_date'],
          technician: d['start_date'],
          Status: d['status'],
          cost: d['cost'],
          part_cost: d['partCost'],
          total_cost: d['start_date']
        }
      })
    });
    this.assetMasterService.getRequestsByAssetID(this.assetID).subscribe(x => {
      let data = x.message;
      this.jobCard_Table3.data = (<Array<object>>data).map(d => {
        return {
          issue: d['request'],
          date: d['createdAt'],
          description: d['description'],
          Status: d['approveStatus'],
          issue_type: d['accidentType'],
          reported_by: d['creator']['firstName'] + ' ' + d['creator']['lastName'],
          attachment: d['documentIds']
        }
      })
    });

  }

  getDetailsActiveJobCard(id) {
    this.detailsJobCard = this.listActiveJobCard.filter(x => x.id == id )[0]
    if (this.detailsJobCard['startDate'])
      this.detailsJobCard['startDate'] = moment.utc(this.detailsJobCard['startDate'] * 1000).local().format('DD-MM-YYYY')
  }

  diffDate(x,y) {
    let endDate = moment.utc(y*1000).local().toDate();
    let startDate = moment.utc(x*1000).local().toDate();
    let diffDate = moment(endDate).diff(startDate, 'hours');
    return diffDate
  }

}

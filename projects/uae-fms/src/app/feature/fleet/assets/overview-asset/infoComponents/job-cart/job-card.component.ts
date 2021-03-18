import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ColumnType } from '@core/table';

@Component({
  selector: 'app-asset-overview-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobCardComponent implements OnInit {

  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';

  jobCard_Table1 = {
    columns: [
      {
        lable: 'tables.column.task',
        field: 'task',
        type: ColumnType.lable,
        thumbField: '',
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
        field: 'status',
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
        renderer: ''
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
    data: [
      {
        task: 'Charge AC',
        priority: '1',
        duration: '5 Hours',
        status: 'Started',
        start_date: '02-02-2020',
        technician: 'Atefeh',
        cost: '2300 AED',
        part_cost: '2300 AED',
        total_cost: '4700 AED',
      },
      {
        task: 'Charge AC',
        priority: '1',
        duration: '5 Hours',
        status: 'Started',
        start_date: '02-02-2020',
        technician: 'Atefeh',
        cost: '2300 AED',
        part_cost: '2300 AED',
        total_cost: '4700 AED',
      },
      {
        task: 'Charge AC',
        priority: '1',
        duration: '5 Hours',
        status: 'Started',
        start_date: '02-02-2020',
        technician: 'Atefeh',
        cost: '2300 AED',
        part_cost: '2300 AED',
        total_cost: '4700 AED',
      },
      {
        task: 'Charge AC',
        priority: '1',
        duration: '5 Hours',
        status: 'Started',
        start_date: '02-02-2020',
        technician: 'Atefeh',
        cost: '2300 AED',
        part_cost: '2300 AED',
        total_cost: '4700 AED',
      },
      {
        task: 'Charge AC',
        priority: '1',
        duration: '5 Hours',
        status: 'Started',
        start_date: '02-02-2020',
        technician: 'Atefeh',
        cost: '2300 AED',
        part_cost: '2300 AED',
        total_cost: '4700 AED',
      },
      {
        lable: '',
        field: 'floatButton',
        width: 1,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton',
        sortable: true
      }
    ],
    rowSettings: {
      floatButton: [
        {
          button: 'external',
          onClick: (col, data, button) => {
            if (button == 'external') {
              this.section = 'detail-box';
            }
            // this.router.navigate(['/fleet/assets/' + data.id]);
          }
        }
      ]
    }
  }

  jobCard_Table2 = {
    columns: [
      {
        lable: 'tables.column.start_date',
        field: 'start_date',
        type: ColumnType.lable,
        thumbField: '',
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
        lable: 'tables.column.end_date',
        field: 'end_date',
        width: 130,
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
    data: [
      {
        start_date: '02-02-2020',
        duration: '5 Hours',
        end_date: '02-02-2020',
        actual_end_date: '02-02-2020',
        delay: '7 Days',
        technician: 'Mohammad, Ahmad',
        cost: '2300 AED',
        part_cost: '2300 AED',
        total_cost: '4700 AED',
      },
      {
        start_date: '02-02-2020',
        duration: '5 Hours',
        end_date: '02-02-2020',
        actual_end_date: '02-02-2020',
        delay: '7 Days',
        technician: 'Mohammad, Ahmad',
        cost: '2300 AED',
        part_cost: '2300 AED',
        total_cost: '4700 AED',
      },
      {
        start_date: '02-02-2020',
        duration: '5 Hours',
        end_date: '02-02-2020',
        actual_end_date: '02-02-2020',
        delay: '7 Days',
        technician: 'Mohammad, Ahmad',
        cost: '2300 AED',
        part_cost: '2300 AED',
        total_cost: '4700 AED',
      },
      {
        start_date: '02-02-2020',
        duration: '5 Hours',
        end_date: '02-02-2020',
        actual_end_date: '02-02-2020',
        delay: '7 Days',
        technician: 'Mohammad, Ahmad',
        cost: '2300 AED',
        part_cost: '2300 AED',
        total_cost: '4700 AED',
      },
      {
        start_date: '02-02-2020',
        duration: '5 Hours',
        end_date: '02-02-2020',
        actual_end_date: '02-02-2020',
        delay: '7 Days',
        technician: 'Mohammad, Ahmad',
        cost: '2300 AED',
        part_cost: '2300 AED',
        total_cost: '4700 AED',
      }
    ],
    rowSettings: {
      floatButton: [
      ]
    }
  };

  jobCard_Table3 = {
    columns: [
      {
        lable: 'tables.column.issue',
        field: 'issue',
        type: ColumnType.lable,
        thumbField: '',
      },
      {
        lable: 'tables.column.date',
        field: 'date',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.description',
        field: 'description',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.issue_type',
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
        thumbField: '',
        renderer: '',
        sortable: true
      }
    ],
    data: [
      {
        issue: 'Oil Leaking',
        date: '02-02-2020',
        description: 'Description is here, description is here',
        issue_type: 'Repair',
        reported_by: 'Atefeh',
        attachment: 'Download'
      },
      {
        issue: 'Oil Leaking',
        date: '02-02-2020',
        description: 'Description is here, description is here',
        issue_type: 'Repair',
        reported_by: 'Atefeh',
        attachment: 'Download'
      },
      {
        issue: 'Oil Leaking',
        date: '02-02-2020',
        description: 'Description is here, description is here',
        issue_type: 'Repair',
        reported_by: 'Atefeh',
        attachment: 'Download'
      },
      {
        issue: 'Oil Leaking',
        date: '02-02-2020',
        description: 'Description is here, description is here',
        issue_type: 'Repair',
        reported_by: 'Atefeh',
        attachment: 'Download'
      },
      {
        issue: 'Oil Leaking',
        date: '02-02-2020',
        description: 'Description is here, description is here',
        issue_type: 'Repair',
        reported_by: 'Atefeh',
        attachment: 'Download'
      },
      {
        issue: 'Oil Leaking',
        date: '02-02-2020',
        description: 'Description is here, description is here',
        issue_type: 'Repair',
        reported_by: 'Atefeh',
        attachment: 'Download'
      }
    ],
    rowSettings: {
      floatButton: [
      ]
    }
  };

  section = 'list';
  showSection(section: string): void {
    this.section = section;
  }


  constructor() {}

  ngOnInit(): void {}
}

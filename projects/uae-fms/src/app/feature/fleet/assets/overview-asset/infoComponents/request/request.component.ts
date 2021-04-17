import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnType } from '@core/table';

@Component({
  selector: 'app-asset-overview-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  constructor(private _fb:FormBuilder) {}

  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  activeLayout = 'menu';
  inputForm: FormGroup;
  submitted=false;
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

  submitRequest(section:string){
    this.submitted = true
    if(this.inputForm.invalid){
      return
    }else{
      this.section = section;

    }
  }


  ngOnInit(): void {
    this.inputForm = this._fb.group({
      issueType:[''],
      reason:[false],
      accidentOption: ['miner'],
      jobType:[''],
      issue:['',Validators.required],
      createdBy:['',Validators.required],
      description:['',Validators.required],
      file:['']
    })
  }
}

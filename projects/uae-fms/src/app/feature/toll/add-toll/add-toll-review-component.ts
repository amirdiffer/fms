import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-toll-review',
  template: `
    <div class="table-container">
      <h3 class="mx-3 my-4">6 Toll Tag Found Please Review and Save</h3>
      <app-table [setting]="tableSetting"></app-table>
    </div>
  `,
  styles: [
    `
      h3 {
        font-size: 1em;
      }
    `
  ]
})
export class AddTollReviewComponent implements OnInit {
  tableSetting = {
    columns: [
      {
        lable: 'tables.column.toll_tag',
        field: 'tag',
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.purshate_date',
        field: 'purshateDate',
        type: 1,
        thumbField: '',
        renderer: ''
      }
    ],
    data: [
      {
        tag: '123456789',
        purshateDate: '02/02/2020'
      },
      {
        tag: '123456789',
        purshateDate: '02/02/2020'
      },
      {
        tag: '123456789',
        purshateDate: '02/02/2020'
      },
      {
        tag: '123456789',
        purshateDate: '02/02/2020'
      },
      {
        tag: '123456789',
        purshateDate: '02/02/2020'
      }
    ]
  };
  constructor() {}

  ngOnInit(): void {}
}

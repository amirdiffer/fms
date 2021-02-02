import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';

@Component({
  selector: 'anms-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOrganizationComponent implements OnInit {
  organization_Table: TableSetting = {
    columns: [
      {
        lable: 'Section',
        type: 1,
        field: 'Section'
      },
      {
        lable: 'Location',
        type: 1,
        field: 'Location'
      },
      {
        lable: 'TF Payed',
        sortable: true,
        type: 1,
        field: 'TF_Payed'
      },
      {
        lable: 'TF Unpaid',
        sortable: true,
        type: 1,
        field: 'TF_Unpaid'
      },
      {
        lable:
          '<img src="../../../../assets/icons/operator.svg" class="icon24px">',
        type: 1,
        sortable: true,
        isIconLable: true,
        field: 'user',
        width: 100
      },
      {
        lable:
          '<img src="../../../../assets/icons/car-solid.svg" class="icon24px">',
        type: 1,
        sortable: true,
        isIconLable: true,
        field: 'car',
        width: 100
      },
      {
        lable: '',
        width: 70,
        type: 3,
        field: 'actionButton',
        renderer: 'actionButtonRenderer'
      }
    ],
    data: [
      {
        Section: 'Section`s Name is Here',
        Location: '2',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        actionButton: ''
      },
      {
        Section: 'Section`s Name is Here',
        Location: '2',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        actionButton: ''
      },
      {
        Section: 'Section`s Name is Here',
        Location: '2',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        actionButton: ''
      },
      {
        Section: 'Section`s Name is Here',
        Location: '2',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        actionButton: ''
      },
      {
        Section: 'Section`s Name is Here',
        Location: '2',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        actionButton: ''
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {}
}

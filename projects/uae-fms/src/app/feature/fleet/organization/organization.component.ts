import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';
import { ButtonType } from '@core/table/table.component';
import { OrganizationFacade } from '../+state/organization';

@Component({
  selector: 'anms-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  organization_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.organization',
        type: 1,
        field: 'Organization'
      },
      {
        lable: 'tables.column.section',
        sortable: true,
        type: 1,
        field: 'Section'
      },
      {
        lable: 'tables.column.location',
        sortable: true,
        type: 1,
        field: 'Location'
      },
      {
        lable: 'tables.column.tf_payed',
        sortable: true,
        type: 1,
        field: 'TF_Payed'
      },
      {
        lable: 'tables.column.tf_unpaid',
        sortable: true,
        type: 1,
        field: 'TF_Unpaid'
      },
      {
        lable: '<img src="../../../../assets/icons/operator.svg">',
        type: 1,
        sortable: true,
        isIconLable: true,
        field: 'user',
        width: 100
      },
      {
        lable: '<img src="../../../../assets/icons/car-solid.svg">',
        type: 1,
        isIconLable: true,
        field: 'car',
        width: 100
      },
      {
        lable: '',
        type: 3,
        width: 70,
        field: 'addButton',
        renderer: 'button',
        buttonType: ButtonType.add
      },
      {
        lable: '',
        width: 70,
        type: 3,
        field: 'actionButton',
        renderer: 'button',
        buttonType: ButtonType.action
      }
    ],
    data: [
      {
        Organization: 'Name is here',
        Section: '7',
        Location: '4',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        addButton: '',
        actionButton: ''
      },
      {
        Organization: 'Name is here',
        Section: '7',
        Location: '4',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        addButton: '',
        actionButton: ''
      },
      {
        Organization: 'Name is here',
        Section: '7',
        Location: '4',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        addButton: '',
        actionButton: ''
      },
      {
        Organization: 'Name is here',
        Section: '7',
        Location: '4',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        addButton: '',
        actionButton: ''
      },
      {
        Organization: 'Name is here',
        Section: '7',
        Location: '4',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        addButton: '',
        actionButton: ''
      }
    ]
  };

  constructor(private facade: OrganizationFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();
    this.facade.organization$.subscribe((data) => {
      console.log(data, 'organizations');
    });
  }
}

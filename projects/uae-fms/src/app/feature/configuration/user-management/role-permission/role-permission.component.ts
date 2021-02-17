import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';
import { RolePermissionFacade } from '../../+state/role-permission';

@Component({
  selector: 'anms-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolePermissionComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';

  accessory_Table: TableSetting = {
    columns: [
      { lable: 'Name', type: 1, field: 'Item' },
      { lable: 'View', type: 1, field: 'View' },
      { lable: 'Edit', type: 1, field: 'Edit' },
      { lable: 'Create', type: 1, field: 'Create' },
      {
        lable: '',
        type: 1,
        field: 'external_link',
        width: 50,
        renderer: 'externalLinkRenderer'
      }
    ],
    data: [
      {
        Item: 'Name is here',
        View: 'Task Master, Service Shop',
        Edit: 'Body Shop',
        Create: 'Tire Shop',
        external_link: 'http://'
      },
      {
        Item: 'Name is here',
        View: 'Task Master, Service Shop',
        Edit: 'Body Shop',
        Create: 'Tire Shop',
        external_link: 'http://'
      },
      {
        Item: 'Name is here',
        View: 'Task Master, Service Shop',
        Edit: 'Body Shop',
        Create: 'Tire Shop',
        external_link: 'http://'
      },
      {
        Item: 'Name is here',
        View: 'Task Master, Service Shop',
        Edit: 'Body Shop',
        Create: 'Tire Shop',
        external_link: 'http://'
      },
      {
        Item: 'Name is here',
        View: 'Task Master, Service Shop',
        Edit: 'Body Shop',
        Create: 'Tire Shop',
        external_link: 'http://'
      },
      {
        Item: 'Name is here',
        View: 'Task Master, Service Shop',
        Edit: 'Body Shop',
        Create: 'Tire Shop',
        external_link: 'http://'
      }
    ]
  };

  constructor(private facade: RolePermissionFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }
}

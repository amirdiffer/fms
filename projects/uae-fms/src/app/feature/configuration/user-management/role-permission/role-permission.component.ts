import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ColumnType, TableSetting } from '@core/table';
import { RolePermissionFacade } from '../../+state/role-permission';

@Component({
  selector: 'anms-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolePermissionComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';

  rolePermission_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.name', type: 1, field: 'Item' },
      { lable: 'tables.column.view', type: 1, field: 'View' },
      { lable: 'tables.column.edit', type: 1, field: 'Edit' },
      { lable: 'tables.column.create', type: 1, field: 'Create' },
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
        Item: 'Name is here',
        View: 'Task Master, Service Shop',
        Edit: 'Body Shop',
        Create: 'Tire Shop'
      },
      {
        Item: 'Name is here',
        View: 'Task Master, Service Shop',
        Edit: 'Body Shop',
        Create: 'Tire Shop'
      },
      {
        Item: 'Name is here',
        View: 'Task Master, Service Shop',
        Edit: 'Body Shop',
        Create: 'Tire Shop'
      },
      {
        Item: 'Name is here',
        View: 'Task Master, Service Shop',
        Edit: 'Body Shop',
        Create: 'Tire Shop'
      },
      {
        Item: 'Name is here',
        View: 'Task Master, Service Shop',
        Edit: 'Body Shop',
        Create: 'Tire Shop'
      },
      {
        Item: 'Name is here',
        View: 'Task Master, Service Shop',
        Edit: 'Body Shop',
        Create: 'Tire Shop'
      }
    ],
    rowSettings: {
      onClick: (col, data, button?) => {
        console.log(col, data, button);
      },
      floatButton: [
        {
          button: 'external',
        }
      ]
    }
  };

  constructor(private facade: RolePermissionFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }
}

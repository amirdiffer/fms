import { Component, OnInit } from '@angular/core';
import { ColumnType, TableSetting } from '@core/table';
import { from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RolePermissionFacade } from '../../+state/role-permission';

@Component({
  selector: 'anms-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss']
})
export class RolePermissionComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  data$ = this.facade.rolePermission$.pipe(
    map(
      x => {
        return x.map(y =>{
          return {...y , description:'No description' , numberOfUser:'No Number of User'}
        })
      }
    )
  )

  rolePermission_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.role_name', type: 1, field: 'roleName' },
      { lable: 'tables.column.description', type: 1, field: 'description' },
      { lable: 'tables.column.number_of_user', type: 1, field: 'numberOfUser' },
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
      onClick: (col, data, button?) => {},
      floatButton: [
        {
          button: 'external'
        }
      ]
    }
  };

  constructor(private facade: RolePermissionFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }
}

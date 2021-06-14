import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '@core/Permission/permission.guard';
import { AddCategoryComponent } from './add-category/add-category.component';
import { BusinessCategoryComponent } from './business-category.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessCategoryComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['BUSINESS_CATEGORY_VIEW_LIST', 'BUSINESS_CATEGORY_ADD']
    }
  },
  {
    path: 'add-usage-category',
    component: AddCategoryComponent,
    canActivate: [PermissionGuard],
    data: {
      name: 'Category Name',
      permission: ['BUSINESS_CATEGORY_ADD']
    }
  },
  {
    path: 'edit-usage-category/:id',
    component: AddCategoryComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['BUSINESS_CATEGORY_UPDATE']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessCategoryRoutingModule {}

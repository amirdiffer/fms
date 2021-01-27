import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationComponent } from './configuration.component';
import { BusinessCategoryComponent } from '@feature/configuration/business-category/business-category.component';

const routes: Routes = [
  { path: '', component: ConfigurationComponent },
  { path: 'business-category', component: BusinessCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}

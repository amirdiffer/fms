import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationComponent } from './configuration.component';

const routes: Routes = [
  { path: '', component: ConfigurationComponent },
  {
    path: 'user-management',
    loadChildren: () =>
      import('../configuration/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}

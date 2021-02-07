import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddIntegrationComponent } from './add-integration/add-integration.component';

import { IntegrationComponent } from './integration.component';

const routes: Routes = [
  { path: '', component: IntegrationComponent },
  { path: 'add', component: AddIntegrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationRoutingModule {}

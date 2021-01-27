import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigurationComponent } from './configuration.component';
import { PeriodicServiceComponent } from './periodic-service/periodic-service.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'periodic-service',
    component: ConfigurationComponent
  },
  { path: 'periodic-service', component: PeriodicServiceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}

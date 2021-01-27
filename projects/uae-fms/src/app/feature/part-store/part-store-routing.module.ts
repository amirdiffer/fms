import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartMasterComponent } from './part-master/part-master.component';

import { PartStoreComponent } from './part-store.component';

const routes: Routes = [
  { path: '', component: PartStoreComponent },
  { path: 'part-master', component: PartMasterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartStoreRoutingModule {}

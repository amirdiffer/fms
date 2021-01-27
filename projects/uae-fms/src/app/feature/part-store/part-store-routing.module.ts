import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartStoreComponent } from './part-store.component';

const routes: Routes = [
  { path: '', component: PartStoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartStoreRoutingModule {}

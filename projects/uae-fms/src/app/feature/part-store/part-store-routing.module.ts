import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartStoreComponent } from './part-store.component';
import { PartListComponent } from '@feature/part-store/part-list/part-list.component';

const routes: Routes = [
  { path: '', component: PartStoreComponent },
  { path: 'part-list', component: PartListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartStoreRoutingModule {}

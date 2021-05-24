import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationComponent } from './location.component';
import { AddLocationComponent } from './add-location/add-location.component';

const routes: Routes = [
  {
    path: '',
    component: LocationComponent
  },
  {
    path: 'add-location',
    component: AddLocationComponent
  },
  {
    path: 'edit-location/:type/:id',
    component: AddLocationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }

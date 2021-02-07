import { AddTollComponent } from './add-toll/add-toll.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TollComponent } from './toll.component';

const routes: Routes = [
  { path: '', component: TollComponent },
  { path: 'add-toll', component: AddTollComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TollRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TollComponent } from './toll.component';

const routes: Routes = [{ path: '', component: TollComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TollRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WindowResizeService } from '././window-resize.service';
import { RouterService } from './router.service';

@NgModule({
  imports: [RouterModule],
  exports: [],
  declarations: [],
  providers: [WindowResizeService, RouterService]
})
export class GeneralServicesModule {}

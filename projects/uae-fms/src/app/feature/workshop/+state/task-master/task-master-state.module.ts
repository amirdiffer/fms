import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as taskMasterReducer from './task-master.reducer';
import { TaskMasterFacade, TaskMasterService } from './index';
import { WORKSHOP_TASK_MASTER_FEATURE_KEY } from './task-master.entity';
import { TaskMasterEffect } from './task-master.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(
      WORKSHOP_TASK_MASTER_FEATURE_KEY,
      taskMasterReducer.reducer
    ),
    EffectsModule.forFeature([TaskMasterEffect])
  ],
  providers: [TaskMasterFacade, TaskMasterService]
})
export class TaskMasterStateModule {}

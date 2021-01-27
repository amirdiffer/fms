import { TestBed } from '@angular/core/testing';

import { TaskMasterService } from './task-master.service';

describe('TaskMasterService', () => {
  let service: TaskMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MyTasksNetworkService } from './my-tasks-network.service';

describe('MyTasksNetworkService', () => {
  let service: MyTasksNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTasksNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

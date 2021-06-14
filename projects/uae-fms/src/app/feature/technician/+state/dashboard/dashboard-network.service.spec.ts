import { TestBed } from '@angular/core/testing';

import { DashboardNetworkService } from './dashboard-network.service';

describe('DashboardNetworkService', () => {
  let service: DashboardNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

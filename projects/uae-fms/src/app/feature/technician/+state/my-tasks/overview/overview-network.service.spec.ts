import { TestBed } from '@angular/core/testing';

import { OverviewNetworkService } from './overview-network.service';

describe('OverviewNetworkService', () => {
  let service: OverviewNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverviewNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

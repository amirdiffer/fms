import { TestBed } from '@angular/core/testing';

import { PartRequestsNetworkService } from './part-requests-network.service';

describe('PartRequestsNetworkService', () => {
  let service: PartRequestsNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartRequestsNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

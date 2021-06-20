import { TestBed } from '@angular/core/testing';

import { AllRequestsNetworkService } from './all-requests-network.service';

describe('AllRequestsNetworkService', () => {
  let service: AllRequestsNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllRequestsNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

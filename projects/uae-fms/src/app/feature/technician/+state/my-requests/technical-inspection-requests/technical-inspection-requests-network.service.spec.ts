import { TestBed } from '@angular/core/testing';

import { TechnicalInspectionRequestsNetworkService } from './technical-inspection-requests-network.service';

describe('TechnicalInspectionRequestsNetworkService', () => {
  let service: TechnicalInspectionRequestsNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalInspectionRequestsNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

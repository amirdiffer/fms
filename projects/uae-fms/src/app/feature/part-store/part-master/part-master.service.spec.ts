import { TestBed } from '@angular/core/testing';

import { PartMasterService } from './part-master.service';

describe('PartMasterService', () => {
  let service: PartMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

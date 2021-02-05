import { TestBed } from '@angular/core/testing';

import { MakeDecisionService } from './make-decision.service';

describe('MakeDecisionService', () => {
  let service: MakeDecisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeDecisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

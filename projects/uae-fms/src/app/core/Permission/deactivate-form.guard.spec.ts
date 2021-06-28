import { TestBed } from '@angular/core/testing';

import { DeactivateFormGuard } from './deactivate-form.guard';

describe('DeactivateFormGuard', () => {
  let guard: DeactivateFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeactivateFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

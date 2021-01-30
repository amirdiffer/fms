import { TestBed } from '@angular/core/testing';

import { AssetConfigurationService } from './asset-configuration.service';

describe('AssetConfigurationService', () => {
  let service: AssetConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PartageDataService } from './partage-data.service';

describe('PartageDataService', () => {
  let service: PartageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

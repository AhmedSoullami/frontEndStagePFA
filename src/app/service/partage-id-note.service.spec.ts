import { TestBed } from '@angular/core/testing';

import { PartageIdNoteService } from './partage-id-note.service';

describe('PartageIdNoteService', () => {
  let service: PartageIdNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartageIdNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

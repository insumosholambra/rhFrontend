import { TestBed } from '@angular/core/testing';

import { DocsListService } from './docs-list.service';

describe('DocsListService', () => {
  let service: DocsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

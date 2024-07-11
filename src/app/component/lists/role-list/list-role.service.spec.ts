import { TestBed } from '@angular/core/testing';

import { ListRoleService } from './list-role.service';

describe('ListRoleService', () => {
  let service: ListRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

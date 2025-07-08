import { TestBed } from '@angular/core/testing';

import { UafNgService } from './uaf-ng.service';

describe('UafNgService', () => {
  let service: UafNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UafNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

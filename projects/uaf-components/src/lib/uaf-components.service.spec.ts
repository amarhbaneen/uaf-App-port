import { TestBed } from '@angular/core/testing';

import { UafComponentsService } from './uaf-components.service';

describe('UafComponentsService', () => {
  let service: UafComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UafComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

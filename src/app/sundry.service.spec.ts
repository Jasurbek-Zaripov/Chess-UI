import { TestBed } from '@angular/core/testing';

import { SundryService } from './sundry.service';

describe('SundryService', () => {
  let service: SundryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SundryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

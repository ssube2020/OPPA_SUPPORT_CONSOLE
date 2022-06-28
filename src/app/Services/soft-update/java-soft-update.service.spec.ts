import { TestBed } from '@angular/core/testing';

import { JavaSoftUpdateService } from './java-soft-update.service';

describe('JavaSoftUpdateService', () => {
  let service: JavaSoftUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JavaSoftUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

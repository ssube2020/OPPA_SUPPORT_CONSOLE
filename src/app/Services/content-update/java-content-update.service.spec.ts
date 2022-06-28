import { TestBed } from '@angular/core/testing';

import { JavaContentUpdateService } from './java-content-update.service';

describe('JavaContentUpdateService', () => {
  let service: JavaContentUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JavaContentUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

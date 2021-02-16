import { TestBed } from '@angular/core/testing';

import { ImmaPathService } from './imma-path.service';

describe('ImmaPathService', () => {
  let service: ImmaPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImmaPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { QubitService } from './qubit.service';

describe('QubitService', () => {
  let service: QubitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QubitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

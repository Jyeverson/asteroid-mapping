import { TestBed } from '@angular/core/testing';

import { AsteroidTableService } from './asteroid-table.service';

describe('AsteroidTableService', () => {
  let service: AsteroidTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsteroidTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

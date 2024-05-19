import { TestBed } from '@angular/core/testing';

import { MyreadinglistService } from './myreadinglist.service';

describe('MyreadinglistService', () => {
  let service: MyreadinglistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyreadinglistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { C4ccustomerdetailsService } from './c4ccustomerdetails.service';

describe('C4ccustomerdetailsService', () => {
  let service: C4ccustomerdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(C4ccustomerdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

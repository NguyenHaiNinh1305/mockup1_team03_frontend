import { TestBed } from '@angular/core/testing';

import { AvataServiceService } from './avata-service.service';

describe('AvataServiceService', () => {
  let service: AvataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

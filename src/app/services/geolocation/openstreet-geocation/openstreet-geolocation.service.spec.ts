import { TestBed } from '@angular/core/testing';

import { OpenstreetGeolocationService } from './openstreet-geolocation.service';

describe('OpenstreetGeolocationService', () => {
  let service: OpenstreetGeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenstreetGeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

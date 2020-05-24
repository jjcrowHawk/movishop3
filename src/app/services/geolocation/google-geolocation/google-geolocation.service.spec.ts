import { TestBed } from '@angular/core/testing';

import { GoogleGeolocationService } from './google-geolocation.service';

describe('GoogleGeolocationService', () => {
  let service: GoogleGeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleGeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RealtimeClientService } from './realtime-client.service';

describe('RealtimeClientService', () => {
  let service: RealtimeClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

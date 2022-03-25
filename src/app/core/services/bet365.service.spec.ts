import { TestBed } from '@angular/core/testing';

import { Bet365Service } from './bet365.service';

describe('Bet365Service', () => {
  let service: Bet365Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bet365Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

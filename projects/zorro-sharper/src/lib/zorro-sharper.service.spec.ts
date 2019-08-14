import { TestBed } from '@angular/core/testing';

import { ZorroSharperService } from './zorro-sharper.service';

describe('ZorroSharperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZorroSharperService = TestBed.get(ZorroSharperService);
    expect(service).toBeTruthy();
  });
});

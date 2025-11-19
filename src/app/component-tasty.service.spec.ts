import { TestBed } from '@angular/core/testing';

import { ComponentTastyService } from './component-tasty.service';

describe('ComponentTastyService', () => {
  let service: ComponentTastyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentTastyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GobalviewService } from './gobalview.service';

describe('GobalviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GobalviewService]
    });
  });

  it('should ...', inject([GobalviewService], (service: GobalviewService) => {
    expect(service).toBeTruthy();
  }));
});

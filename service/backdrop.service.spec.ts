/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackdropService } from './backdrop.service';

describe('BackdropService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackdropService]
    });
  });

  it('should ...', inject([BackdropService], (service: BackdropService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SettopbarService } from './settopbar.service';

describe('SettopbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettopbarService]
    });
  });

  it('should ...', inject([SettopbarService], (service: SettopbarService) => {
    expect(service).toBeTruthy();
  }));
});

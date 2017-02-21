import { BackdropComponent } from './../src/app/backdrop/backdrop.component';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class BackdropService {
  StatusBackdrop = new EventEmitter();
  constructor() { }

  onBackdrop(){
    this.StatusBackdrop.emit(true);    
  }
  offBackdrop(){
    this.StatusBackdrop.emit(false);
  }

}

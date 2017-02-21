import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NavigationService {

  nav:boolean = true;
  constructor() { }

  visibility(st:boolean){
      this.nav = st;
  }
  getVisibility(){
    return this.nav;
  }
}

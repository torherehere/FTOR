import { Injectable } from '@angular/core';

@Injectable()
export class SettopbarService {

  constructor() { }
  
  title:string;
  topbar:boolean = true;

  settitle(title:string){
    this.title = title;
  }
  gettitle(){
    return this.title;
  }

  visibility(st:boolean){
    this.topbar = st;
  }

  getVisibility(){
    return this.topbar;
  }

}

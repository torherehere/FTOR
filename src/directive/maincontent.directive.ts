import { Directive, ViewContainerRef, Input, Renderer, ElementRef, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[Maincontent]'
})
export class MaincontentDirective {

  @Input() set Maincontent(st:boolean){
    console.log(st["0"].topbar, st[1].nav);  
    let topbar = st["0"].topbar;
    let nav = st[1].nav;
    if(topbar == false && nav == false){
        this.setMargin(0,0,0);
    }
    if(topbar == false && nav == true){
        this.setMargin(30,310,30);
    }  
    if(topbar == true && nav == false){
        this.setMargin(110,30,30);
    }  
    if(topbar == true && nav == true){
        this.setMargin(110,310,30);
    }  
  } 
  constructor(private view: ViewContainerRef, private _el: ElementRef, private renderer: Renderer) { }

  setMargin(top:number,left:number,right:number){
     this.renderer.setElementStyle(this.view.element.nativeElement, 'marginTop', top + 'px');
      this.renderer.setElementStyle(this.view.element.nativeElement, 'marginLeft', left + 'px');
       this.renderer.setElementStyle(this.view.element.nativeElement, 'marginRight', right + 'px');
  }

}

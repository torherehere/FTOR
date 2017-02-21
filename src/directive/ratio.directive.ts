import { element } from 'protractor';
import { Directive, ViewContainerRef, Input, Renderer, ElementRef, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[Ratio]'
})
export class RatioDirective {


  ratio:string='4x3';
  myView:any;

  constructor(private view: ViewContainerRef, private _el: ElementRef, private renderer: Renderer) { 
      this.myView = this.view;
  }
  @HostListener('window:resize', ['$event'])
    onResize(ev:any) {
        if(this.isElementVisible(this.myView.element.nativeElement) != false){
            this.newHeightSize(this.myView);
        }
    }
  @Input() set Ratio(ratio:string){
      console.log(ratio);
      this.ratio = ratio;
  }

  ngOnInit(){  
    if(this.isElementVisible(this.myView.element.nativeElement) != false){
        this.newHeightSize(this.myView);
    }
  }

 isElementVisible(el:any) {
      var rect     = el.getBoundingClientRect(),
          vWidth   = window.innerWidth || el.clientWidth,
          vHeight  = window.innerHeight || el.clientHeight,
          efp      = function (x:any, y:any) { return document.elementFromPoint(x, y) };     

      // Return false if it's not in the viewport
      if (rect.right < 0 || rect.bottom < 0 
              || rect.left > vWidth || rect.top > vHeight)
          return false;

      // Return true if any of its four corners are visible
      return (
            el.contains(efp(rect.left,  rect.top))
        ||  el.contains(efp(rect.right, rect.top))
        ||  el.contains(efp(rect.right, rect.bottom))
        ||  el.contains(efp(rect.left,  rect.bottom))
      );
  }

  newHeightSize(vv:any){
    let newWidth = vv.element.nativeElement.offsetWidth
    if(this.ratio = '4x3') {
        var newHeight = (3 / 4) * newWidth;
    } else {
        var newHeight = (9 / 16) * newWidth;
    }
    this.renderer.setElementStyle(vv.element.nativeElement, 'height', newHeight + 'px');
    //(original height / original width) x new width = new height
  }

}

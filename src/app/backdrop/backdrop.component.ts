import { BackdropService } from './../../../service/backdrop.service';
import { Component, OnInit, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'backdrop',
  template: `<div></div>`
})
export class BackdropComponent implements OnInit {

  constructor(private _elementRef: ElementRef, private renderer: Renderer, private bdCtrl: BackdropService) { }

  ngOnInit() {
      this.bdCtrl.StatusBackdrop.subscribe((data:any) => {
          if(data == true){
            this.on();
          } else {
            this.off();
          }
      })
  }

  on(){
    this.renderer.setElementStyle(this._elementRef.nativeElement, 'display', 'block');  
    this._elementRef.nativeElement.className = "fade_in"  
  }

  off(){
    this.renderer.setElementStyle(this._elementRef.nativeElement, 'display', 'none');
  }

}

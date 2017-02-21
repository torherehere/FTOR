import { Component, Directive, HostListener, ViewContainerRef, Input, ElementRef } from '@angular/core';
@Directive({
  selector: '[Slide]'
})
export class SlideDirective {
  
  current:number = 0;
  WrapperSet:boolean = false;
  countSlide:any = 0;
  isLoopEnd:boolean = false;
  length_OF_children:any = 0;
  myView: any;

  constructor(private view: ViewContainerRef, private _el: ElementRef) { 
      this.myView = view;
  }

  //@HostListener('click', ['$event'])onClick(){}
  @HostListener('window:resize', ['$event'])
    onResize(ev:any) {
        console.log("resize", this.view);
        console.log("ck visible onResize" , this.isElementVisible(this.view.element.nativeElement));
    }

  @Input('SlideTo') To:any; 
  @Input('Margin') margin:number = 0; 
  @Input('Each') each:number = 1; 
  @Input('Ratio') ratio:string = "nomal_slide";
  @Input('Speed') speed:any = 0.6;
  @Input('El') el:any;

  @Input() set Data(data:any){}  
  @Input() set loopck(n:any){
      console.log("looop",n);
      if(n == true){
           this.ngOnInit();
      } 
  };

  @Input() set SlideTo(ev:any){
      if(Number.isInteger(ev) == true){
          console.log("Number Slide " + ev);
          this.toSlide(ev)
      } else { 
          this.slideForBtn(ev)  
        }     
  }
  ngOnInit(){ 
      console.log(this.view,this.myView);
    //   this.isViewReady(this.view,() => {          
    //       this.runFlow(this.view);
    //   }) 
  }
  isViewReady(vw:any,cb:any){
      if(vw != undefined && vw.element.nativeElement.children.length != 0 && this.isElementVisible(vw.element.nativeElement) == true){
          console.log(" View Ready !!");
          cb();
      } else { 
          console.log("Not Ready !!", vw, "children",vw.element.nativeElement.children.length, "visible",this.isElementVisible(vw.element.nativeElement));          
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
  runFlow(viwe:any){
      this.flow_1(viwe);
      this.flow_2(viwe);
  }
  flow_1(vw:any){
        //console.log(this.margin, this.each, this.ratio, this.speed);
        // Get element
        let w_parent = vw.element.nativeElement.parentElement.clientWidth;
        let countChild = vw.element.nativeElement.children.length
        let slide_wrapper = vw.element.nativeElement
        let slide = vw.element.nativeElement.children
        let parent = vw.element.nativeElement.parentElement
        

        // Set Parent
        parent.style.overflow = 'hidden'
        parent.style.position = "relative"

        // Set Wrapper 
        let cal_wrap = (w_parent * countChild) + (this.margin * countChild)
        if(cal_wrap == 0){
            cal_wrap = w_parent * 100
        }
        slide_wrapper.style.width = cal_wrap +"px"       
        slide_wrapper.style.transition = "all "+this.speed+"s"

        // ck Each
        if(this.each == 1){
            this.margin = 0
        }
        if(this.each > 4){
            this.each = 4
        }

        // Set Slide Each
        for(var i=0; i <= countChild-1; i++ ){
            slide[i.toString()].style.width = (w_parent / this.each) - (this.margin * this.each) +"px"
            slide[i.toString()].style.float = 'left'
            slide[i.toString()].style.marginLeft = this.margin +"px"
            slide[i.toString()].className = this.ratio;
        } 
        
        this.slideTo(vw)
  }
  flow_2(vw:any){
        this.wrapperSet(vw,(data:any) => { console.log("setWrapper"); })
        // First View
        var btn_next = vw.element.nativeElement.offsetParent.children.slideNext
        var btn_prev = vw.element.nativeElement.offsetParent.children.slidePrev
        let countChild = vw.element.nativeElement.children.length
        if(countChild == 1){
            btn_next.style.display = "none" 
            btn_prev.style.display = "none"
        }
        if(countChild != 1){
                switch (true) {
                    // end
                    case this.current == countChild-1:
                        btn_next.style.display = "none"
                        btn_prev.style.display = "block"
                    break;
                    // between
                    case this.current > 0 && this.current < countChild-1:
                        btn_next.style.display = "block"
                        btn_prev.style.display = "block"
                    break
                    // first
                    case this.current == 0:
                        btn_next.style.display = "block"
                        btn_prev.style.display = "none"
                    break
                }
        }
  }

    protected slideForBtn(ev:any){
        if(this.To !== undefined){
            let isBtn = ev.toElement.id
            if(isBtn == "next"){
                this.nextSlide(ev)
            } else {
                this.prevSlide(ev)
            }   
        }
    }
    protected tackClick(ev:any){
        let center = ev.target.offsetWidth/2
        let pointer = ev.offsetX
        if(pointer > center){
            this.nextSlide(ev)  
        } else { this.prevSlide(ev) }      
    }
    protected nextSlide(ev:any = ''){    
        this.addCurrent((data:any) => {  
            this.slideTo(-this.current)  
            this.statusBtn(ev)    
        })
    }
    protected prevSlide(ev:any = ''){
        this.reduceCurrent((data:any) => {
            this.slideTo(-this.current)
            this.statusBtn(ev) 
        })
    }
    toSlide(set:number){
        this.current = set
        if(this.current == set){
            this.slideTo(-this.current)
        }
    }
   protected addCurrent(cb:any){
        this.current+=1   
        let count =  this.length_OF_children/this.each                
        if(this.current > Math.round(count) - 1){
            this.current = Math.round(count) - 1;
        }
        setTimeout(() => { cb() })
    }
   protected reduceCurrent(cb:any){
        this.current-=1
        let count = this.length_OF_children
        if(this.current < 1) {    
            this.current = 0;
        }
        setTimeout(() => { cb() })
    }

    protected slideTo(vw:any){
            this.wrapperSet(vw,(data:any) => {
                var index:number = -this.current
                var slide_wrapper = vw.element.nativeElement
                var w_parent = vw.element.nativeElement.parentElement.clientWidth
                switch (true) {
                    case this.margin == 0:
                        var tran_to = w_parent * index
                        break;
                    case this.margin != 0:
                        if(this.each == 2){
                            var cal_margin = (this.margin  * -index)*this.each
                            var tran_to = (w_parent * index) + (cal_margin + (cal_margin/(this.current * 2 * this.each) ))
                            if(isNaN(tran_to) == true ){
                                var tran_to = 0
                            }
                            console.log( tran_to, cal_margin/4);                    
                        }
                        if(this.each > 2){
                            var cal_margin = (this.margin  * -index)*this.each
                            var tran_to = (w_parent * index) + (cal_margin*this.each + -cal_margin/2 * 2) + cal_margin
                            console.log( tran_to , cal_margin, cal_margin/2);
                        }
                        break;
                
                    default:
                        console.log("default");
                        var tran_to = w_parent * index
                        break;
                }
                slide_wrapper.style.transform = "translateX("+ tran_to +"px)"
            })
    }
    protected statusBtn (ev:any){
        if(this.To !== undefined){
            let btn_next = ev.target.offsetParent.offsetParent.children.slideNext
            let btn_prev = ev.target.offsetParent.offsetParent.children.slidePrev
            let count =  this.length_OF_children/this.each            
            switch (true) {
                // end
                case this.current == Math.round(count)-1:
                    btn_next.style.display = "none"
                    btn_prev.style.display = "block"
                break;
                // between
                case this.current > 0 && this.current < Math.round(count)-1:   
                    btn_next.style.display = "block"
                    btn_prev.style.display = "block"
                break
                // first
                case this.current == 0:
                    btn_next.style.display = "block"
                    btn_prev.style.display = "none"  
                break
            }
            
        }
    }

    protected wrapperSet(vw_in:any,cb:any){
        // Get element
        let vw = vw_in
        let countChild = vw.element.nativeElement.children.length
        if(this.WrapperSet == true){ 
            cb()             
        } else if (countChild != 0){

            let w_parent = vw.element.nativeElement.parentElement.clientWidth;
            let slide_wrapper = vw.element.nativeElement
            let slide = vw.element.nativeElement.children
            let parent = vw.element.nativeElement.parentElement

            // Set Wrapper 
            slide_wrapper.style.width = (w_parent * countChild) + (this.margin * countChild) +"px" 
            slide_wrapper.style.transition = "all "+this.speed+"s"
            // Set Slide Each
            for(var i=0; i <= countChild-1; i++ ){
                slide[i.toString()].style.width = (w_parent / this.each) - (this.margin * this.each) +"px"
                slide[i.toString()].style.float = 'left'
                slide[i.toString()].style.marginLeft = this.margin +"px"
                slide[i.toString()].className = this.ratio;
            } 
            this.WrapperSet = true;
            setTimeout(() => { cb(); },100)  
        }
    }
}           

@Component({
   selector: 'islast',
   template: '<span></span>'
})

export class LastDirective {
   @Input() isLast: boolean=false;
   ngOnInit() {
    //    console.log(this.isLast);
       SlideDirective.prototype.loopck = this.isLast;
   }
}
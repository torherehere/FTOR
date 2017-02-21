import { Component, ViewContainerRef, Input, Renderer, ElementRef, EventEmitter, HostListener } from '@angular/core';

@Component({
    selector: "nook-slides",
    template: `<ng-content></ng-content>`
}) export class NookSlides {
    current:number = 0;
    length_OF_children:number = 0;
    constructor(private _elementRef: ElementRef, private renderer: Renderer){}
    
    @Input('BtnSlide') To:any; 
    @Input('Margin') margin:number = 0; 
    @Input('Each') each:number = 1; 
    @Input('Ratio') ratio:string = "4x3";
    @Input('Speed') speed:any = 0.6;

    // ************** ON DATA **************
    @Input() set Data(data:any){
        console.log("change data",data);
        if(data != undefined){
            this.length_OF_children = data.length
            console.log(this.length_OF_children);
        }
    }
    // ************** ON RESIZE **************
    @HostListener('window:resize', ['$event'])
    onResize(ev:any) {
        console.log("on resize");
        this.slideTransform(null);
    }

    // ************** ON SLIDE TO **************
    @Input() set BtnSlide(ev:any){        
        if(this.To !== undefined){
            let isBtn = ev.toElement.id            
            if(isBtn == "next"){
                this.nextSlide(ev)
            } else {
                this.prevSlide(ev)
            }   
        }
    }

    ngOnInit(){
        if(this.isOnsrceen() == true){
            // Set Parent     
            let parent = this._elementRef.nativeElement.parentElement.parentElement
            if(this.ratio == '4x3'){this.addClass4x3(parent);}
            if(this.ratio == '16x9'){this.addClass16x9(parent);}
        }
        this.renderer.setElementStyle(this._elementRef.nativeElement, 'width', 'auto');
        this.renderer.setElementStyle(this._elementRef.nativeElement, 'position', 'absolute');
        this.renderer.setElementStyle(this._elementRef.nativeElement, 'white-space', 'nowrap');
        this.renderer.setElementStyle(this._elementRef.nativeElement, 'transition',"all "+this.speed+"s");
    }
    protected addClass4x3(parent:any){
        if(this.each == 5){
            parent.className = "nook_slide_4x3 eachfive"
        }
        if(this.each == 4){
            parent.className = "nook_slide_4x3 eachfour"
        }
        if(this.each == 3){
            parent.className = "nook_slide_4x3 eachthree"
        }
        if(this.each == 2){
            parent.className = "nook_slide_4x3 eachtwo"
        }
        if(this.each == 1){
            parent.className = "nook_slide_4x3"
        }
    }
    protected addClass16x9(parent:any){
        if(this.each == 5){
            parent.className = "nook_slide_16x9 eachfive"
        }
        if(this.each == 4){
            parent.className = "nook_slide_16x9 eachfour"
        }
        if(this.each == 3){
            parent.className = "nook_slide_16x9 eachthree"
        }
        if(this.each == 2){
            parent.className = "nook_slide_16x9 eachtwo"
        }
        if(this.each == 1){
            parent.className = "nook_slide_16x9"
        }
    }
    ngOnChange(){console.log("current", this.current);}
    isOnsrceen(){
        if(this._elementRef.nativeElement.getBoundingClientRect().top != 0){
            console.log("on srceen nook-slides");
            return true;
        } else {
            console.log("not on srceen nook-slides", this._elementRef.nativeElement.getBoundingClientRect());
        }
    }
    protected slideTransform(ev:any){
        if(ev != null){
            var index:number = -this.current
            if(ev.path[2].firstElementChild.firstElementChild.localName == 'nook-slides'){
                var slide_wrapper = ev.path[2].firstElementChild.firstElementChild
                var w_parent      = ev.path[2].firstElementChild.firstElementChild.offsetParent.clientWidth
                console.log(slide_wrapper, w_parent);
            }
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
        } else {
            console.log(ev);
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
            this.slideTransform(ev)  // slideTo transform function 
            this.statusBtn(ev)    
        })
    }
    protected prevSlide(ev:any = ''){
        this.reduceCurrent((data:any) => {
            this.slideTransform(ev) // slideTo transform function 
            this.statusBtn(ev) 
        })
    }
    toSlide(ev:any,set:number){
        this.current = set
        if(this.current == set){
            this.slideTransform(ev) // slideTo transform function 
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
}

@Component({
    selector: "nk-slide",
    template: `<ng-content></ng-content>`
}) export class NkSlide {
    @Input('Set') set:any;
    @HostListener('window:resize', ['$event'])
        onResize(ev:any) { 
            this.ngOnInit();
        }

    constructor(private _elementRef: ElementRef, private renderer: Renderer){}
    ngOnInit(){
        if(this.isOnsrceen() == true){
            let w_parent = this._elementRef.nativeElement.parentElement.offsetParent.clientWidth
            let each = this.set["0"].ea;
            let margin = this.set["1"].mr;
            let ratio = this.set["2"].ra;

            let cal_width = (w_parent / each) - (margin * each)
            console.log("cal_width of NkSlide", cal_width);
            
            this._elementRef.nativeElement.className = ratio;
            this.renderer.setElementStyle(this._elementRef.nativeElement, 'width', cal_width +'px');
            this.renderer.setElementStyle(this._elementRef.nativeElement, 'display', 'inline-block');  
            this.renderer.setElementStyle(this._elementRef.nativeElement, 'marginLeft', margin +'px');
        }
    }   
    isOnsrceen(){
        if(this._elementRef.nativeElement.getBoundingClientRect().top != 0){
            console.log("on srceen");
            return true;
        } else {
            console.log("not on srceen", this._elementRef.nativeElement.getBoundingClientRect());
        }
    }
}
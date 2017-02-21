import { BackdropService } from './backdrop.service';
import { Injectable, OnInit, ComponentFactoryResolver, EventEmitter, ReflectiveInjector } from '@angular/core';

@Injectable()
export class GobalviewService {
  // viewChild
  gobal_container:any=null
  gobal_content:any=null
  // data share
  datamodal=new EventEmitter()
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private bdCtrl: BackdropService) { }

  setGobalElement(gobal_container:any,gobal_content:any){
        if(gobal_content == null||undefined || gobal_container == null||undefined){ 
            console.error("not view gobal/// nook !!!") 
        } else {
            this.gobal_container = gobal_container 
            this.gobal_content = gobal_content         
        }
    }

    getGobalContainer(){
        return this.gobal_container;
    }
    getGobalContent(){
        return this.gobal_content;
    }

    createFactor(comp:any){
        const factory = this.componentFactoryResolver.resolveComponentFactory(comp)
        return factory
    }

    preload_modal(cb:any){
        console.log(1)
        this.gobal_content._element.nativeElement.innerHTML += `
        <div id="bzn_md_preload" class='bzn_md_preload'> 
            <img src='./assets/images/loading.gif'> 
        </div>`
        // bulid modal and backdrop
        window.onscroll = (ev) =>  { if(window.innerWidth >= 1024){ window.scroll(0,0) } else {  } }
        setTimeout(() => { cb(console.log('success')) }, 500)
    }
    preload_modal_close(){
        console.log(2);
        this.gobal_content._element.nativeElement.innerHTML = ``
    }

    startGobalView(modal:any, param:any=null){
        this.preload_modal((data:any) => {
            this.preload_modal_close()
            this.bdCtrl.onBackdrop();
            this.gobal_container._element.nativeElement.className = "bzn_modal visible"
            // create to viewchild
            const injector = ReflectiveInjector.fromResolvedProviders([], this.gobal_content.parentInjector);
            this.gobal_content.createComponent(modal, 0, injector, []).instance.datamodal = param;
            // add param to share datmodal
            this.datamodal.emit(param)
            console.log(3)
        })
    }

    endGobalView(){
        this.gobal_content.clear();
        this.bdCtrl.offBackdrop();
    }

}

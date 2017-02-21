import { AuthSV } from './../../api/auth';
import { PositionSV } from './../../api/position';
import { Appfn } from './../../appfn';
import { GobalviewService } from './../../../../service/gobalview.service';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-addmembers',
  templateUrl: './addmembers.component.html',
})
export class AddmembersComponent implements OnInit {

  @ViewChild('FormSlideWrap', {read: ViewContainerRef})
  FormSlideWrap: ViewContainerRef;

  currentPage:number=0;
  PageAmount:number=3;
  st_1:string= "col-md-3";
  st_2:string= "col-md-3";
  st_3:string= "col-md-3";
  
  app = new Appfn();
  fname: string;
  lname: string;
  address: string;
  phone: string;
  gender: string;
  email: string;
  password: string;
  response: any;
  listPosition: any;
  position_id: any;
  jobTitle: string;
  saraly: number; 
  salaryTerm: number;
  dateOfHire: any;
  constructor(private gbview: GobalviewService, private position: PositionSV, private auth: AuthSV){}

  ngOnInit() {
    this.activeState();
    this.getPosition();
  } 

  getPosition(){
      this.position.getAllPosition().subscribe(data=>{
          this.listPosition = data;
      })
  }

  protected setCurrent(cb:any, page:number){
      this.currentPage=page               
      if(this.currentPage > this.PageAmount - 1) {    
          this.currentPage = this.PageAmount - 1;
      }
      if(this.currentPage < 1) {    
          this.currentPage = 0;
      }
      setTimeout(() => { cb() })
  }

  protected addCurrent(cb:any){
      this.currentPage+=1   
      if(this.currentPage > this.PageAmount - 1) {    
          this.currentPage = this.PageAmount - 1;
      }
      setTimeout(() => { cb() })
  }
  protected reduceCurrent(cb:any){
      this.currentPage-=1
      if(this.currentPage < 0) {    
          this.currentPage = 0;
      }
      setTimeout(() => { cb() })
  }


  protected indexPage(index:number){
    this.setCurrent(() => {
        this.transitLeft(this.currentPage)   
      }, index
    )
  }

  protected nextPage(){ 
    this.addCurrent(() => { 
        this.transitLeft(this.currentPage)   
    }) 
  }

  protected prevPage(){
    this.reduceCurrent(() => {
        this.transitRight(this.currentPage)
      }
    )
  }

  submit(){
      this.response = ''; 
      
      if(!this.app.isEmpty(this.fname) && !this.app.isEmpty(this.lname) && !this.app.isEmpty(this.phone) && !this.app.isEmpty(this.address) && !this.app.isEmpty(this.gender) && !this.app.isEmpty(this.email) && !this.app.isEmpty(this.password) && !this.app.isEmpty(this.position_id)){
          
          this.dateOfHire = this.app.isEmpty(this.dateOfHire) ? '' : this.app.changeDateTimeStamp(this.dateOfHire);
          
          this.auth.register(this.fname, this.lname, this.address, this.phone, this.gender, this.jobTitle, this.saraly, this.salaryTerm, this.email, this.password, this.position_id, this.dateOfHire).subscribe(data=>{
              this.gbview.endGobalView();
              this.auth.active.emit(true);
          }) 
      }else{
          this.response = 'กรุณากรอกข้อมูลให้ครบ...'
      } 
  }

  protected transitLeft(num:number){
    if(window.innerWidth <= 1024){
      var base_tran_to = 601
    } else {
      var base_tran_to = 714
    }
    var tran_to = base_tran_to * -num
    this.FormSlideWrap.element.nativeElement.style.transform = "translateX("+ tran_to +"px)"
    this.activeState();
  }
  protected transitRight(num:number){
    if(window.innerWidth <= 1024){
      var base_tran_to = 601
    } else {
      var base_tran_to = 714
    }
    var tran_to = base_tran_to * -num
    this.FormSlideWrap.element.nativeElement.style.transform = "translateX("+ tran_to +"px)"
    this.activeState();
  }

  protected closeGobalView(){
    this.gbview.endGobalView();
  }

  protected activeState(){
    switch(true) {
        case this.currentPage == 0:
            this.st_1 = "col-md-3 wait";
            break;
        case this.currentPage == 1:
            this.st_1 = "col-md-3 success";
            this.st_2 = "col-md-3 wait";
            break;
        case this.currentPage == 2:
            this.st_1 = "col-md-3 success";
            this.st_2 = "col-md-3 success";
            this.st_3 = "col-md-3 wait";
            break;
        default:
          this.st_1 = "col-md-3";
          this.st_2 = "col-md-3";   
          this.st_3 = "col-md-3";
            
    }
  }

  protected goProfile (){
  }

}

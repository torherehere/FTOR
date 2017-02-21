import { SendinactiveComponent } from './sub/sendinactive.component';
import { Appfn } from './../appfn';
import { Router } from '@angular/router';
import { AuthSV } from './../api/auth';
import { AddmembersComponent } from './sub/addmembers.component';
import { GobalviewService } from './../../../service/gobalview.service';
import { SettopbarService } from './../../../service/settopbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html', 
})

export class TeamComponent implements OnInit {
  
  app = new Appfn();
  listUser: any;
  listUser2: any;
  permission: any;
  search: string; 
  state: boolean = false;

  constructor(private setsv: SettopbarService, private gobalview: GobalviewService, private auth: AuthSV, private router: Router) {}

  ngOnInit() {
     this.setsv.settitle("Active Member");

      if(this.auth.checkLogin()){   
          this.auth.getSession(this.auth.getToken()).subscribe(data=>{  
              this.permission = data.permission;
              this.getAllUser(); 
          }) 
      }else{
          this.router.navigate(['/login'])
      } 

      this.auth.active.subscribe(data=>{ 
          this.getAllUser();
      })

  } SendinactiveComponent

  addMembers(){
    let addMemberComp = this.gobalview.createFactor(AddmembersComponent);
    this.gobalview.startGobalView(addMemberComp)
  }
  sendInactive(){
    let sendInactiveComp = this.gobalview.createFactor(SendinactiveComponent);
    this.gobalview.startGobalView(sendInactiveComp)
  }

  getAllUser(){
    this.auth.getAllUsers().subscribe(data=>{ 
        this.listUser = data; 
        this.listUser2 = data; 
    });
  }

  eventSearch(){ 
      if(!this.app.isEmpty(this.search) && this.search.length >= 3){  
            this.auth.searchUser(this.search).subscribe(data=>{ 
                this.listUser = data;
            })    
      }else{
            this.listUser = this.listUser2;
      } 
  }
 
}


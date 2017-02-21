import { Appfn } from './../appfn';
import { EditaVatar } from './editavatar/editavatar';
import { GobalviewService } from './../../../service/gobalview.service';
import { AuthSV } from './../api/auth';
import { ActivatedRoute } from '@angular/router';
import { SettopbarService } from './../../../service/settopbar.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  app = new Appfn();
  uid: any;
  fullname: string;
  phone: string;
  email: string;
  position: string;
  avatar: string;
  defalut: string = '../assets/images/Avatar.png';
  session_id: any;
  permission: any;

  constructor(private settitle: SettopbarService, private route: ActivatedRoute, private auth: AuthSV, private gobalview: GobalviewService){}

  ngOnInit() { 
      this.settitle.settitle("Profile");

      this.getSession();

      this.route.params.subscribe(data=>{ 
            this.uid = data['_id'];   
            this.auth.owner.uid = this.uid;
            this.getUser();  
      })

      this.auth.active.subscribe(data=>{ 
          this.getUser();
      })
  } 

  getUser(){
      this.auth.getUser(this.uid).subscribe(data=>{ 
          this.fullname = data.first_name+' '+data.last_name;
          this.phone = data.phone;
          this.email = data.email;
          this.position = data.role.position;
          this.avatar = (data.avatar) ? this.app.api()+data.avatar.path : this.defalut;
 
      }) 
  }

  getSession(){
      this.auth.getSession(this.auth.getToken()).subscribe(data=>{ 
          if(data){
                this.session_id = data._id;
                this.permission = data.permission;
          } 
      })
  }

  openModal(){
      let tview = this.gobalview.createFactor(EditaVatar);
      this.gobalview.startGobalView(tview, this.uid) 
  }

}

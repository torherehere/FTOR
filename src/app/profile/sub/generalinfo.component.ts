import { Appfn } from './../../appfn';
import { AuthSV } from './../../api/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generalinfo',
  templateUrl: './generalinfo.component.html'
})

export class GeneralinfoComponent implements OnInit {
  
  app = new Appfn();
  uid: any;
  fname: string;
  lname: string;
  address: string;
  phone: string;
  gender: string;
  response: any;
  session_id: any;
  permission: any;

  constructor(private auth: AuthSV){}

  ngOnInit() {  
      this.auth.getSession(this.auth.getToken()).subscribe(data=>{
          this.session_id = data._id;
          this.permission = data.permission;
      })

      this.uid = this.auth.owner.uid;
      this.getUser();
  }  

  getUser(){
      this.auth.getUser(this.uid).subscribe(data=>{ 
          this.fname = data.first_name;
          this.lname = data.last_name;
          this.address = data.address;
          this.phone = data.phone;
          this.gender = data.gender;
      })
  }

  submit(){  
      if(!this.app.isEmpty(this.fname) && !this.app.isEmpty(this.lname) && !this.app.isEmpty(this.address) && !this.app.isEmpty(this.phone) && !this.app.isEmpty(this.gender)){
            var dataArr = {
                first_name: this.fname,
                last_name: this.lname,
                address: this.address,
                phone: this.phone,
                gender: this.gender,
            }
            
            this.auth.updateUser(this.uid, dataArr).subscribe(data=>{
                this.response = 'บันทึกสำเร็จ !';
            })

      }else{
            this.response = 'กรุณากรอกข้อมูลให้ครบ !';
      }
  }

}

import { Appfn } from './../../appfn';
import { AuthSV } from './../../api/auth';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-accountsetting',
    templateUrl: './accountsetting.component.html'
})

export class AccountsettingComponent implements OnInit {

    app = new Appfn();
    uid: any;
    email: string;
    password: string;
    confirm_password: string;
    response: any;
    session_id :any;
    permission: any;

    constructor(private auth: AuthSV){}

    ngOnInit() {
        this.uid = this.auth.owner.uid
        this.getUser();
        this.getSession();
    }

    getUser(){
        this.auth.getUser(this.uid).subscribe(data=>{
            this.email = data.email;
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

    submit(){  
        if(this.app.isEmpty(this.email)){
            this.response = 'กรุณากรอกอีเมล์ !'

        }else{
            this.checkPassword((resp)=>{
                if(resp){
                    this.auth.updateAccount(this.uid, this.email, this.password, this.confirm_password).subscribe(data=>{
                          if(data == 'error'){
                              this.response = 'รหัสผ่านไม่ตรงกัน !'
                          }else if(data == 'same'){
                              this.response = 'อีเมล์มีการใช้งานแล้ว !'
                          }else{
                              this.response = 'บันทึกสำเร็จ !' 
                              this.clearData();
                          }
                      })
                      
                }else{
                    this.response = 'กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัว !'
                }
            })
            
        } 
    }

    checkPassword(cb: any){
        if(!this.app.isEmpty(this.password)){
            if(this.password.length >= 8){
                cb(true);
            }else{
                cb(false);
            }
        }else{
            cb(true);
        }
    }

    clearData(){
        this.password = '';
        this.confirm_password = '';
    }

}

import { SettopbarService } from './../../../../service/settopbar.service'; 
import { Router } from '@angular/router';
import { AuthSV } from './../../api/auth';
import { Appfn } from './../../appfn';
import { Component } from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})

export class Login{
    app = new Appfn();

    email: string;
    password: string;
    responde: string;

    constructor(private auth: AuthSV, private router: Router, private settitle: SettopbarService){}

    ngOnInit(){
        if(this.auth.checkLogin()){
            this.router.navigate(['/dashboard']); 
        }
    }

    submitLogin(){  
        this.responde = ''; 
        if(this.app.isEmpty(this.email) && this.app.isEmpty(this.password)){
            this.responde = 'is empty';
        }else{
            this.auth.submitLogin(this.email, this.password).subscribe(data=>{
                if(data == 'error'){
                    this.responde = 'ข้อมูลไม่ถูกต้อง';
                }else {
                    this.auth.active.emit(true);
                    this.responde = 'success';
                    this.auth.setToken(data.token);
                    this.router.navigate(['/dashboard']); 
                }
            })
        }
        
    } 
}
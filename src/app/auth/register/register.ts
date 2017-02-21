import { AuthSV } from './../../api/auth';
import { Appfn } from './../../appfn';
import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
    selector: 'register',
    templateUrl: 'register.html'
})

export class Register{
    app = new Appfn();
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    permission: number = 0;
    responde: string;
    fullname: string;

    constructor(private auth: AuthSV, private router: Router){}

    submitRegister(){
        this.responde = '';

        if(this.app.isEmpty(this.username) && this.app.isEmpty(this.email) && this.app.isEmpty(this.password) && this.app.isEmpty(this.password_confirm)){
            this.responde = 'value is empty.'

        }else{
            this.auth.submitRegister(this.username, this.fullname, this.email, this.password, this.password_confirm, this.permission).subscribe(data=>{
                if(data == 'error'){
                    this.responde = 'password is not same.'

                }else{
                    this.responde = 'success.'
                    this.router.navigate(['/login']);
                }
            })
        }
    }
}
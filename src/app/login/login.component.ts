import { Appfn } from './../appfn';
import { Router } from '@angular/router';
import { AuthSV } from './../api/auth';
import { SettopbarService } from './../../../service/settopbar.service';
import { NavigationService } from './../../../service/navigation.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    app = new Appfn();

    email: string;
    password: string;
    responde: string;

    constructor(private svtopbar: SettopbarService, private svnav: NavigationService, private auth: AuthSV, private router: Router){}

    ngOnInit() {
        this.svnav.visibility(false);
        this.svtopbar.visibility(false);

        if(this.auth.checkLogin()){
            this.router.navigate(['/dashboard']); 
        }
    }

    ngOnDestroy(){
        this.svnav.visibility(true);
        this.svtopbar.visibility(true);
    }

    close(){
        this.svnav.visibility(false);
        this.svtopbar.visibility(false);
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

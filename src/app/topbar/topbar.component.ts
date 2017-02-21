import { Router } from '@angular/router';
import { AuthSV } from './../api/auth';
import { SettopbarService } from './../../../service/settopbar.service';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from './../../../service/navigation.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html'
})

export class TopbarComponent implements OnInit {

    fullname: string;
    position: string;
    uid: any;
    constructor(private svset: SettopbarService, private auth: AuthSV, private router: Router){}

    ngOnInit() {  
        this.getSession();
    } 

    getSession(){
        this.auth.getSession(this.auth.getToken()).subscribe(data=>{
            if(data){
                this.uid = data._id 
                this.getUser();
            } 
        })
    }

    getUser(){
        this.auth.getUser(this.uid).subscribe(user=>{
            this.fullname = user.first_name+' '+user.last_name;
            this.position = user.role.position;
        })
    }

    logout(){
        this.auth.removeToken(); 
        this.router.navigate(['/login']);
    } 
}

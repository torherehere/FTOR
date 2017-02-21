import { Appfn } from './../appfn';
import { Injectable, EventEmitter } from '@angular/core';
import {Http, Response,Headers} from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/Rx';

@Injectable()
export class AuthSV {

    app = new Appfn();
    headers = new Headers();
    dataUser = new EventEmitter();
    active = new EventEmitter();
    owner = { uid: ''};

    constructor(private http: Http, private cookieService: CookieService) {
        this.headers.append('Content-Type','application/json');
    }

    submitRegister(username: string, fullname: string, email: string, password: string, password_confirm: string, position_id: any){ 
        return this.http.post(this.app.api()+'auth/submitRegister',this.app.body({username: username, fullname: fullname, email: email, password: password, password_confirm: password_confirm, position_id: position_id}),{headers:this.headers}).map(res => res.json());
    } 

    submitLogin(email: string, password: string){
        return this.http.post(this.app.api()+'auth/submitLogin',this.app.body({email: email, password: password}),{headers:this.headers}).map(res => res.json());        
    }

    getSession(token: string){
        return this.http.post(this.app.api()+'auth/getSession',this.app.body({token: token}),{headers:this.headers}).map(res => res.json());        
    }

    getAllUsers(){
        return this.http.post(this.app.api()+'auth/getAllUsers',this.app.body({}),{headers:this.headers}).map(res => res.json());      
    }

    getUser(_id: any){
        return this.http.post(this.app.api()+'auth/getUser',this.app.body({_id: _id}),{headers:this.headers}).map(res => res.json());      
    }

    // updateUser(_id: any, username: string, fullname: string, email: string, password: string, position_id: any){
    //     return this.http.post(this.app.api()+'auth/updateUser',this.app.body({_id: _id, username: username, fullname: fullname, email: email, password: password, position_id: position_id}),{headers:this.headers}).map(res => res.json());      
    // }

    updateUser(_id: any, dataArr: any){
        return this.http.post(this.app.api()+'auth/updateUser',this.app.body({_id: _id, dataArr: dataArr}),{headers:this.headers}).map(res => res.json());      
    }

    updateAccount(_id: any, email: any, password: string, confirm_password: string){
        return this.http.post(this.app.api()+'auth/updateAccount',this.app.body({_id: _id, email: email, password: password, confirm_password: confirm_password}),{headers:this.headers}).map(res => res.json());      
    }

    delUser(_id: any){
        return this.http.post(this.app.api()+'auth/delUser',this.app.body({_id: _id}),{headers:this.headers}).map(res => res.json());
    }

    searchUser(search: string){
        return this.http.post(this.app.api()+'auth/searchUser',this.app.body({search: search}),{headers:this.headers}).map(res => res.json());
    }

    setToken(token: string){ 
        return this.cookieService.put('token_wdo', token);
    }

    getToken(){ 
        return this.cookieService.get('token_wdo');
    }

    removeToken(){ 
        return this.cookieService.remove('token_wdo');
    } 

    checkLogin(){
        var token = this.cookieService.get('token_wdo');
        if(!this.app.isEmpty(token)){
            return true;
        }
    }

    register(first_name: string, last_name: string, address: string, phone: string, gender: string, jobTitle: string, saraly: number, saraly_term: number, email: string, password: string, position_id: any, dateOfHire: any){
        return this.http.post(this.app.api()+'auth/register',this.app.body({first_name: first_name, last_name: last_name, address: address, phone: phone, gender: gender, jobTitle: jobTitle, saraly: saraly, saraly_term: saraly_term, email: email, password: password, position_id: position_id, dateOfHire: dateOfHire}),{headers:this.headers}).map(res => res.json());         
    }
}
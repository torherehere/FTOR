import { Appfn } from './../appfn';
import {Injectable} from '@angular/core';
import {Http, Response,Headers} from '@angular/http'; 
import 'rxjs/Rx';

@Injectable()
export class StatusHitSV {
    app = new Appfn();
    headers = new Headers();
    constructor(private http: Http) {
        this.headers.append('Content-Type','application/json');
    }

    getAllStatus(){ 
        return this.http.post(this.app.api()+'status_hit/getAllStatus', this.app.body({}),{headers:this.headers}).map(res => res.json());
    }  
}
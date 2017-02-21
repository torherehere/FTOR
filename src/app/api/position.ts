import { Appfn } from './../appfn';
import {Injectable} from '@angular/core';
import {Http, Response,Headers} from '@angular/http'; 
import 'rxjs/Rx';

@Injectable()
export class PositionSV {
    app = new Appfn();
    headers = new Headers();
    constructor(private http: Http) {
        this.headers.append('Content-Type','application/json');
    }

    getAllPosition(){ 
        return this.http.post(this.app.api()+'position/getAllPosition',this.app.body({}),{headers:this.headers}).map(res => res.json());
    }  
}
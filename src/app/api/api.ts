import { Injectable, EventEmitter } from '@angular/core';
import {Http, Response, Headers} from '@angular/http'; 
import 'rxjs/Rx';

@Injectable()
export class ApiSV {

    ip_server = 'http://192.168.0.36:3000/';
    headers = new Headers();
    active = new EventEmitter();
    activeTitle = new EventEmitter();

    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');
    }

    post(url: any, obj: any){ 
        return this.http.post(this.ip_server+url, JSON.stringify(obj), {headers:this.headers}).map(res => res.json());
    }
}
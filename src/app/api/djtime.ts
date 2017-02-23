import { Appfn } from './../appfn';
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http'; 
import 'rxjs/Rx';

@Injectable()
export class DjTimeSV {
    app = new Appfn();
    headers = new Headers();
    constructor(private http: Http) {
        this.headers.append('Content-Type','application/json');
    }

    addData(time_start: string, time_end: string, name: string, week: string){
        return this.http.post(this.app.api()+'djtime/addData',this.app.body({time_start: time_start, time_end: time_end, name: name, week: week}),{headers:this.headers}).map(res => res.json());
    } 

    getData(){
        return this.http.post(this.app.api()+'djtime/getData',this.app.body({}),{headers:this.headers}).map(res => res.json());
    }   

    getDataTable(){
        return this.http.post(this.app.api()+'djtime/getDataTable',this.app.body({}),{headers:this.headers}).map(res => res.json());
    } 

    delData(_id: any){
        return this.http.post(this.app.api()+'djtime/delData',this.app.body({_id: _id}),{headers:this.headers}).map(res => res.json()); 
    }

    findDataById(_id: any){
        return this.http.post(this.app.api()+'djtime/findDataById',this.app.body({_id: _id}),{headers:this.headers}).map(res => res.json()); 
    }

    updateData(_id: any, dataArr: any){
        return this.http.post(this.app.api()+'djtime/updateData',this.app.body({_id: _id, dataArr: dataArr}),{headers:this.headers}).map(res => res.json()); 
    }
}
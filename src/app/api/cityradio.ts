import { Appfn } from './../appfn';
import {Injectable} from '@angular/core';
import {Http, Response,Headers} from '@angular/http'; 
import 'rxjs/Rx';

@Injectable()
export class CityRadioSV {
    app = new Appfn();
    headers = new Headers();
    constructor(private http: Http) {
        this.headers.append('Content-Type','application/json');
    }

    updateData(dataArr: any){
        return this.http.post(this.app.api()+'cityradio/updateData',this.app.body({dataArr: dataArr}),{headers:this.headers}).map(res => res.json());
    }

    getData(){
        return this.http.post(this.app.api()+'cityradio/getData',this.app.body({}),{headers:this.headers}).map(res => res.json());
    }  

    updateDataPartner(_id: any, dataArr: any){
        return this.http.post(this.app.api()+'cityradio/updateDataPartner', this.app.body({_id: _id, dataArr: dataArr}),{headers:this.headers}).map(res => res.json());
    } 

    getDataPartner(){
        return this.http.post(this.app.api()+'cityradio/getDataPartner',this.app.body({}),{headers:this.headers}).map(res => res.json());
    } 

    delPartner(_id: any){
        return this.http.post(this.app.api()+'cityradio/delPartner',this.app.body({_id: _id}),{headers:this.headers}).map(res => res.json());
    } 

    updateDataAds(_id: any, dataArr: any){
        return this.http.post(this.app.api()+'cityradio/updateDataAds', this.app.body({_id: _id, dataArr: dataArr}),{headers:this.headers}).map(res => res.json());
    } 

    getDataAds(){
        return this.http.post(this.app.api()+'cityradio/getDataAds',this.app.body({}),{headers:this.headers}).map(res => res.json());
    } 

    delAds(_id: any){
        return this.http.post(this.app.api()+'cityradio/delAds',this.app.body({_id: _id}),{headers:this.headers}).map(res => res.json());
    } 
}
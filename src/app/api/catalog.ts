import { Appfn } from './../appfn';
import {Injectable} from '@angular/core';
import {Http, Response,Headers} from '@angular/http'; 
import 'rxjs/Rx';

@Injectable()
export class CatalogSV {
    app = new Appfn();
    headers = new Headers();
    constructor(private http: Http) {
        this.headers.append('Content-Type','application/json');
    }

    getAllCatalog(){ 
        return this.http.post(this.app.api()+'catalog/getAllCatalog',this.app.body({}),{headers:this.headers}).map(res => res.json());
    } 

    getCatalogByName(slug: string){ 
        return this.http.post(this.app.api()+'catalog/getCatalogByName',this.app.body({slug: slug}),{headers:this.headers}).map(res => res.json());
    }  

    addCatalog(name: string, slug: string, parent_id: any){
        return this.http.post(this.app.api()+'catalog/addCatalog',this.app.body({name: name, slug: slug, parent_id: parent_id}),{headers:this.headers}).map(res => res.json());        
    }

    getCatalogById(_id: any){
        return this.http.post(this.app.api()+'catalog/getCatalogById',this.app.body({_id: _id}),{headers:this.headers}).map(res => res.json());        
    }

    delCatalog(_id: any){
        return this.http.post(this.app.api()+'catalog/delCatalog',this.app.body({_id: _id}),{headers:this.headers}).map(res => res.json());                
    }

    updateCatalog(_id: any, dataArr: any){
        return this.http.post(this.app.api()+'catalog/updateCatalog',this.app.body({_id: _id, dataArr: dataArr}),{headers:this.headers}).map(res => res.json());                        
    } 

    getCatLv2(){
        return this.http.post(this.app.api()+'catalog/getCatLv2',this.app.body({}),{headers:this.headers}).map(res => res.json());                        
    } 

    
}
import { Appfn } from './../appfn';
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/Rx';

@Injectable()
export class BlogSV {
    app = new Appfn();
    headers = new Headers();
    options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http, private cookieService: CookieService) {
        this.headers.append('Content-Type','application/json');
    }

    createBlog(uid: any, title: string, slug: string, content: string, position_id: any, tags: any){
        return this.http.post(this.app.api()+'blog/createBlog',this.app.body({uid: uid, title: title, slug: slug, content: content, position_id: position_id, tags: tags}),{headers:this.headers}).map(res => res.json());
    } 

    getAllBlogByUser(uid: any){
        return this.http.post(this.app.api()+'blog/getAllBlogByUser',this.app.body({uid: uid}),{headers:this.headers}).map(res => res.json());
    } 

    getBlogById(_id: any){
        return this.http.post(this.app.api()+'blog/getBlogById',this.app.body({_id: _id}),{headers:this.headers}).map(res => res.json());
    } 

    getTitleSlugBySlug(slug: string){
        return this.http.post(this.app.api()+'blog/getTitleSlugBySlug',this.app.body({slug: slug}),{headers:this.headers}).map(res => res.json());
    }

    updateBlog(_id: any, dataArr: any){
        return this.http.post(this.app.api()+'blog/updateBlog',this.app.body({_id: _id, dataArr: dataArr}),{headers:this.headers}).map(res => res.json());        
    }

    deleteBlog(_id: any){
        return this.http.post(this.app.api()+'blog/deleteBlog',this.app.body({_id: _id}),{headers:this.headers}).map(res => res.json());        
    }

    getAllBlog(){
        return this.http.post(this.app.api()+'blog/getAllBlog',this.app.body({}),{headers:this.headers}).map(res => res.json());        
    }

    searchBlog(uid: any, search: string){
        return this.http.post(this.app.api()+'blog/searchBlog',this.app.body({uid: uid, search: search}),{headers:this.headers}).map(res => res.json());        
    }
 
    postApi(url: string, object: Object){
        return this.http.post(this.app.api()+url,object,this.options).map(res => res.json());
    }
 
}
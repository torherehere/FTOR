import { Appfn } from './../appfn';
import { Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http'; 
import 'rxjs/Rx';

@Injectable()
export class CommentSV {
    app = new Appfn();
    headers = new Headers();
    constructor(private http: Http) {
        this.headers.append('Content-Type','application/json');
    }

    addComent(uid: any, blog_id: any, comment: string, reply_id: any){ 
        return this.http.post(this.app.api()+'comment/addComent',this.app.body({uid: uid, blog_id: blog_id, comment: comment, reply_id: reply_id}),{headers:this.headers}).map(res => res.json());
    }  

    getCommentByBlogId(blog_id: any){
        return this.http.post(this.app.api()+'comment/getCommentByBlogId',this.app.body({blog_id: blog_id}),{headers:this.headers}).map(res => res.json());        
    }
}
import { Appfn } from './../appfn';
import {Injectable} from '@angular/core';
import {Http, Response,Headers} from '@angular/http'; 
import 'rxjs/Rx';

@Injectable()
export class HitsSV {
    app = new Appfn();
    headers = new Headers();
    constructor(private http: Http) {
        this.headers.append('Content-Type','application/json');
    }

    getAllStatus(){ 
        return this.http.post(this.app.api()+'hits/getAllStatus', this.app.body({}),{headers:this.headers}).map(res => res.json());
    }  

    updateArtist(_id: any, dataArr: any){ 
        return this.http.post(this.app.api()+'hits/updateArtist', this.app.body({_id: _id, dataArr: dataArr}),{headers:this.headers}).map(res => res.json());
    }

    getAllArtist(){ 
        return this.http.post(this.app.api()+'hits/getAllArtist', this.app.body({}),{headers:this.headers}).map(res => res.json());
    }  

    delArtist(_id: any){ 
        return this.http.post(this.app.api()+'hits/delArtist', this.app.body({_id: _id}),{headers:this.headers}).map(res => res.json());
    }

    addTitleHits(date: any){ 
        return this.http.post(this.app.api()+'hits/addTitleHits', this.app.body({date: date}),{headers:this.headers}).map(res => res.json());
    }

    getAllTitle(){ 
        return this.http.post(this.app.api()+'hits/getAllTitle', this.app.body({}),{headers:this.headers}).map(res => res.json());
    }

    getTitle(_id: any){ 
        return this.http.post(this.app.api()+'hits/getTitle', this.app.body({_id: _id}),{headers:this.headers}).map(res => res.json());
    }

    deleteTitle(_id: any){ 
        return this.http.post(this.app.api()+'hits/deleteTitle', this.app.body({_id: _id}),{headers:this.headers}).map(res => res.json());
    }

    updateTitle(_id: any, dataArr: any){ 
        return this.http.post(this.app.api()+'hits/updateTitle', this.app.body({_id: _id, dataArr: dataArr}),{headers:this.headers}).map(res => res.json());
    }

    addDataHits(title_id: any, artist_id: any, status: any, lastweek: any, onchat: any, peak: any, index: any){ 
        return this.http.post(this.app.api()+'hits/addDataHits', this.app.body({title_id: title_id, artist_id: artist_id, status: status, lastweek: lastweek, onchat: onchat, peak: peak, index: index}),{headers:this.headers}).map(res => res.json());
    }

    getDataHitsByDateID(title_id: any){ 
        return this.http.post(this.app.api()+'hits/getDataHitsByDateID', this.app.body({title_id: title_id}),{headers:this.headers}).map(res => res.json());
    }
}
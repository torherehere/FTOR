import { Appfn } from './../appfn';
import { HitsSV } from './../api/hits';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'listhits',
    templateUrl: './listhits.html'
})

export class Listhits{

    app = new Appfn();
    dateID: any;
    listStatus: any; 
    status: number;
    lastweek: string;
    onchat: string; 
    peak: string;
    dateofweek: any;
    response: any;
    listArtist: any;
    index: number;
     
    // autocomplete
    artist_id: any;  

    constructor(private router: ActivatedRoute, private hits: HitsSV){
        router.params.subscribe(data=>{
            this.dateID = data['_id']
        })
    }

    ngOnInit(){
        this.getAllStatus();
        this.getAllArtist();
        this.getDataHitsByDateID();
    }

    select(obj: any) { 
        this.artist_id = obj ? obj._id : null;
    }

    getAllStatus(){
        this.hits.getAllStatus().subscribe(data=>{
            this.listStatus = data; 
        })
    }

    getAllArtist(){
        this.hits.getAllArtist().subscribe(data=>{
            this.listArtist = data; 
        })
    }

    submit(){
        if(this.app.isEmpty(this.status) || this.app.isEmpty(this.lastweek) || this.app.isEmpty(this.onchat) || this.app.isEmpty(this.peak) || this.app.isEmpty(this.artist_id)){
            this.response = 'กรุณากรอกข้อมูล !';

        }else{
            this.response = 'บันทึกข้อมูลสำเร็จ !';
            this.hits.addDataHits(this.dateID, this.artist_id, this.status, this.lastweek, this.onchat, this.peak, this.index).subscribe(data=>{
                this.getDataHitsByDateID();
            }) 
        } 
    }

    getDataHitsByDateID(){
        this.hits.getDataHitsByDateID(this.dateID).subscribe(data=>{
            console.log(data);
            
            this.index = (data.length)+1;
        })
    }

}
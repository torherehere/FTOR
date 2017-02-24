import { GobalviewService } from './../../../../service/gobalview.service';
import { HitsSV } from './../../api/hits';
import { ApiSV } from './../../api/api';
import { Appfn } from './../../appfn';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'editlisthits',
    templateUrl: './editlisthits.html'
})

export class EditListHits{
 
    app = new Appfn();
    _id: any;
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
    listHits: any;
     
    // autocomplete
    artist_id: any;  

    constructor(private api: ApiSV, private hits: HitsSV, private gbview: GobalviewService){
        this.gbview.datamodal.subscribe(_id=>{
            this._id = _id;
            this.getDataHitsByID();
        });
    }

    ngOnInit(){
        this.getAllStatus();
        this.getAllArtist();
        this.getDataHitsByDateID();
    }

    select(obj: any){ 
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

    update(){
        if(this.app.isEmpty(this.status) || this.app.isEmpty(this.lastweek) || this.app.isEmpty(this.onchat) || this.app.isEmpty(this.peak) || this.app.isEmpty(this.artist_id)){
            this.response = 'กรุณากรอกข้อมูล !';

        }else{
            this.response = 'บันทึกข้อมูลสำเร็จ !';
          
            var dataArr = {
                index: this.index,
                artist_id: this.artist_id,
                status: this.status,
                lastweek: this.lastweek,
                onchat: this.onchat, 
                peak: this.peak, 
            }

            this.api.post('hits/updateDataHits', {_id: this._id, dataArr: dataArr}).subscribe(data=>{  
                this.gbview.endGobalView();
                this.api.active.emit(true);
            })
        } 
    }

    getDataHitsByDateID(){
        this.hits.getDataHitsByDateID(this.dateID).subscribe(data=>{
            this.listHits = data;  
        })
    }

    clearData(){
        this.index = null;
        this.artist_id = '';
        this.status = null;
        this.lastweek = '';
        this.onchat = '';
        this.peak = '';
    } 

    closeGobalView(){
        this.gbview.endGobalView();
    }

    getDataHitsByID(){
        this.api.post('hits/getDataHitsByID', {_id: this._id}).subscribe(data=>{  
            this.artist_id = data.artist_id;
            this.status = data.status;
            this.lastweek = data.lastweek;
            this.onchat = data.onchat;
            this.peak = data.peak;
            this.index = data.index;
        })
    }

}
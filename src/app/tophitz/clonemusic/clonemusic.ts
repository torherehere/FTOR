import { GobalviewService } from './../../../../service/gobalview.service';
import { HitsSV } from './../../api/hits';
import { ApiSV } from './../../api/api';
import { Appfn } from './../../appfn';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'clonemusic',
    templateUrl: './clonemusic.html'
})

export class CloneMusic{ 

    app = new Appfn();
    _id: any;
    date: any;
    response: any;

    constructor(private api: ApiSV, private hits: HitsSV, private gbview: GobalviewService){
        this.gbview.datamodal.subscribe(_id=>{ 
            this._id = _id; 
        });
    }

    ngOnInit(){ 
    } 

    closeGobalView(){
        this.gbview.endGobalView();
    } 

    insert(){    
        if(!this.app.isEmpty(this.date)){
            this.api.post('hits/addTitleHits', {date: this.app.changeDateTimeStamp(this.date)}).subscribe(title=>{
                if(title == 'same'){
                    this.response = 'วันที่นี้มีีอยู่ในระบบแล้ว กรุณาเลือกใหม่อีกครั้ง !';

                }else{
                    this.response = 'กรุณารอสักครู่ ...';
                    this.api.post('hits/cloneHitsByDateID', {title_id: this._id}).subscribe(clone=>{
                        
                        clone.forEach(i=>{
                            var dataAdd = {
                                title_id: title._id,
                                artist_id: i.artist_id,
                                status: i.status,
                                lastweek: i.lastweek,
                                onchat: i.onchat,
                                peak: i.peak,
                                index: i.index
                            } 

                            this.api.post('hits/addDataHits', dataAdd).subscribe(data=>{
                                
                            }) 

                        })
                    })

                    setTimeout(()=> {
                        this.response = '';
                        this.api.activeTitle.emit(true);
                        this.gbview.endGobalView();
                    }, 1000);
                } 
            }) 
        }
    }

}
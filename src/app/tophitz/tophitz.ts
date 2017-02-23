import { StatusHitSV } from './../api/status_hit';
import { Appfn } from './../appfn';
import { SettopbarService } from './../../../service/settopbar.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'

@Component({
    selector: 'tophitz',
    templateUrl: './tophitz.html', 
})

export class Tophitz implements OnInit {

    app = new Appfn(); 
    status: number;
    lastweek: string;
    onchat: string;
    music: string;
    artist: string;
    peak: string;
    dateofweek: any;
    listStatus: any;
    response: any;

    constructor(private setsv: SettopbarService, private statushit: StatusHitSV){}

    ngOnInit() {
        this.setsv.settitle("Tophitz"); 
        this.getAllStatus();
    }

    getAllStatus(){
        this.statushit.getAllStatus().subscribe(data=>{
            this.listStatus = data; 
        })
    }

    submit(){  
        if(this.app.isEmpty(this.status) || this.app.isEmpty(this.lastweek) || this.app.isEmpty(this.onchat) || this.app.isEmpty(this.music) || this.app.isEmpty(this.artist) || this.app.isEmpty(this.peak) || this.app.isEmpty(this.dateofweek)){
            this.response = 'กรุณากรอกข้อมูล !';

        }else{
            this.response = 'บันทึกข้อมูลสำเร็จ !';
            console.log(this.status, this.lastweek, this.onchat, this.music, this.artist, this.peak, this.dateofweek); 
        } 
    } 

}

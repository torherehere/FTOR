import { EditListHits } from './editlisthits/editlisthits';
import { GobalviewService } from './../../../service/gobalview.service';
import { ApiSV } from './../api/api';
import { Appfn } from './../appfn';
import { HitsSV } from './../api/hits';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'

@Component({
    selector: 'listhits',
    templateUrl: './listhits.html',
    styles: [`
        .typeahead-input,
        .typeahead-typeahead{
            width: 250px;
            padding: 8px;
            border-radius: 5px;
        }
    `]
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
    listHits: any;
    title: any;
     
    // autocomplete
    artist_id: any;  

    constructor(private router: ActivatedRoute, private hits: HitsSV, private api: ApiSV, private gobalview: GobalviewService){
        router.params.subscribe(data=>{
            this.dateID = data['_id']
        })
    }

    ngOnInit(){
        this.getAllStatus();
        this.getAllArtist();
        this.getDataHitsByDateID();
        this.getTitleByID();

        this.api.active.subscribe(data=>{
            this.getDataHitsByDateID(); 
        })
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
                this.clearData();
            }) 
        } 
    }

    getDataHitsByDateID(){
        this.hits.getDataHitsByDateID(this.dateID).subscribe(data=>{ 
            this.listHits = data; 
            this.index = (data.length)+1;
        })
    }

    clearData(){
        this.artist_id = '';
        this.status = null;
        this.lastweek = '';
        this.onchat = '';
        this.peak = '';
    }

    delete(_id: any){
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'

        }).then(()=>{
            swal('Deleted!', 'Your imaginary file has been deleted.', 'success')

            this.api.post('hits/delete30Hits', {_id: _id}).subscribe(data=>{
                this.getDataHitsByDateID();
                this.clearData();
            })

        }, (dismiss)=>{
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal( 'Cancelled', 'Your imaginary file is safe :)', 'error')
            }
        }) 
    }

    openModal(_id: any){
        let tview = this.gobalview.createFactor(EditListHits);
        this.gobalview.startGobalView(tview, _id) 
    }

    getTitleByID(){
        this.api.post('hits/getTitle', {_id: this.dateID}).subscribe(data=>{ 
            this.title = this.app.convertTime(data.date);
        })
    }

}
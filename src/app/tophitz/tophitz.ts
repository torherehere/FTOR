import { HitsSV } from './../api/hits';
import { NgUploaderOptions, UploadedFile } from 'ngx-uploader'; 
import { Appfn } from './../appfn';
import { SettopbarService } from './../../../service/settopbar.service';
import { Component, OnInit, EventEmitter, NgZone, Inject } from '@angular/core';
import swal from 'sweetalert2'

@Component({
    selector: 'tophitz',
    templateUrl: './tophitz.html', 
})

export class Tophitz implements OnInit {

    app = new Appfn(); 
    music: string;
    artist: string;
    response: any;
    listArtist: any;
    datetitle: any;
    listTitle: any;  
    _id: any;

    // option upload
    options: NgUploaderOptions;  
    sizeLimit: number = 2000000; // 2MB
    previewData: any; 
    inputUploadEvents: EventEmitter<string>;
    resp: any; 

    constructor(private setsv: SettopbarService, private hits: HitsSV, @Inject(NgZone) private zone: NgZone){
        this.options = new NgUploaderOptions({
            url: this.app.api()+'hits/uploadArtist',
            filterExtensions: true,
            allowedExtensions: ['jpg', 'png'],
            data: { },
            autoUpload: false,
            fieldName: 'file',
            fieldReset: true,
            maxUploads: 2,
            method: 'POST',
            previewUrl: true,
            withCredentials: false
        });  
        this.inputUploadEvents = new EventEmitter<string>();
    }

    ngOnInit() {
        this.setsv.settitle("Tophitz"); 
        this.getAllArtist();
        this.getAllTitle(); 
    } 
 
    submit(){    
        if(this.app.isEmpty(this.artist) || this.app.isEmpty(this.music) || this.app.isEmpty(this.previewData)){
            this.response = 'กรุณากรอกข้อมูล !';
        }else{
            this.response = 'บันทึกข้อมูลสำเร็จ !';
            this.inputUploadEvents.emit('startUpload');
        } 
    }

    beforeUpload(uploadingFile: UploadedFile): void {
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            this.response = 'File is too large Max to 2MB!';
        }
    }

    handlePreviewData(data: any) {
        this.previewData = data;
    }

    handleUpload(data: any) {
        setTimeout(() => {
            this.zone.run(() => {
                this.resp = data;
                if (data && data.response) { 
                    this.resp = JSON.parse(data.response);  
                    var dataArr = {
                        music: this.music,
                        artist: this.artist,
                        date: this.app.getTime(),
                    } 

                    this.hits.updateArtist(this.resp._id, dataArr).subscribe(data=>{
                        this.clearData();  
                        this.getAllArtist();
                    })
                }
            });
        });
    }

    clearData(){
        this.music = '';
        this.artist = '';
        this.previewData = '';
        this.resp = '';
        this.datetitle = '';
        this._id = null;
        
    }

    getAllArtist(){
        this.hits.getAllArtist().subscribe(data=>{
            this.listArtist = data; 
        })
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

            this.hits.delArtist(_id).subscribe(data=>{
                this.getAllArtist();
            }) 

        }, (dismiss)=>{
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal( 'Cancelled', 'Your imaginary file is safe :)', 'error')
            }
        }) 
    }

    submitTitle(){
        var dd = this.app.changeDateTimeStamp(this.datetitle); 
        this.hits.addTitleHits(dd).subscribe(data=>{
            this.getAllTitle();
            this.clearData();
        }) 
    }

    getAllTitle(){
        this.hits.getAllTitle().subscribe(data=>{
            this.listTitle = data;
        })
    }

    deleteTitle(_id: any){
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'

        }).then(()=>{
            swal('Deleted!', 'Your imaginary file has been deleted.', 'success')

            this.hits.deleteTitle(_id).subscribe(data=>{
                this.getAllTitle();
            }) 

        }, (dismiss)=>{
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal( 'Cancelled', 'Your imaginary file is safe :)', 'error')
            }
        }) 
    }

    editTitle(_id: any){
        this.hits.getTitle(_id).subscribe(data=>{   
            this._id = data._id;
            this.datetitle = data.date
        })
    } 

    updateTitle(){
        var dataArr = {
            date: this.app.changeDateTimeStamp(this.datetitle)
        } 

        this.hits.updateTitle(this._id, dataArr).subscribe(data=>{
            this.getAllTitle();
            this.clearData();
        })
    }

}

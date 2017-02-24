import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import { GobalviewService } from './../../../../service/gobalview.service';
import { HitsSV } from './../../api/hits';
import { ApiSV } from './../../api/api';
import { Appfn } from './../../appfn';
import { Component, OnInit, EventEmitter, Inject, NgZone } from '@angular/core';

@Component({
    selector: 'editmusic',
    templateUrl: './editmusic.html'
})

export class EditMusic{ 

    app = new Appfn();
    _id: any;
    response: any;
    music: string;
    artist: string; 

    // option upload
    options: NgUploaderOptions;  
    sizeLimit: number = 2000000; // 2MB
    previewData: any; 
    inputUploadEvents: EventEmitter<string>;
    resp: any; 

    constructor(private api: ApiSV, private hits: HitsSV, private gbview: GobalviewService, @Inject(NgZone) private zone: NgZone){
        this.gbview.datamodal.subscribe(_id=>{ 
            this._id = _id; 
            this.getArtistByID();
        });
    }

    ngOnInit(){ 
        this.options = new NgUploaderOptions({
            url: this.app.api()+'hits/updateCoverArtist',
            filterExtensions: true,
            allowedExtensions: ['jpg', 'png'],
            data: { _id: this._id },
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

    getArtistByID(){
        this.api.post('hits/getArtistByID', {_id: this._id}).subscribe(data=>{
            this.music = data.music;
            this.artist = data.artist;
            this.previewData = this.app.api()+data.cover.path;
        })
    }

    closeGobalView(){
        this.gbview.endGobalView();
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
                    this.gbview.endGobalView(); 
                }
            });
        });
    }

    update(){    
        if(this.app.isEmpty(this.artist) || this.app.isEmpty(this.music) || this.app.isEmpty(this.previewData)){
            this.response = 'กรุณากรอกข้อมูล !';
        }else{
            this.response = 'บันทึกข้อมูลสำเร็จ !';
            this.inputUploadEvents.emit('startUpload');

            var dataArr = {
                music: this.music,
                artist: this.artist,
                date: this.app.getTime(),
            } 

            this.hits.updateArtist(this._id, dataArr).subscribe(data=>{ 
                this.api.active.emit(true);
                this.gbview.endGobalView();
            })
        } 
    }

}
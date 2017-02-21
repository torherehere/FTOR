import { AuthSV } from './../../api/auth';
import { Appfn } from './../../appfn';
import { GobalviewService } from './../../../../service/gobalview.service';
import { Component, NgZone, Inject, EventEmitter } from '@angular/core';
import { NgUploaderOptions, UploadedFile, UploadRejected } from 'ngx-uploader';

@Component({
    selector: 'edit-avatar',
    templateUrl: 'editavatar.html'
})

export class EditaVatar{

    app = new Appfn();
    options: NgUploaderOptions;
    response: any;
    sizeLimit: number = 1000000; // 1MB
    previewData: any;
    errorMessage: string;
    inputUploadEvents: EventEmitter<string>;
    resp: any;
    
    constructor(private gbview: GobalviewService, @Inject(NgZone) private zone: NgZone, private auth: AuthSV){

        this.gbview.datamodal.subscribe(_id=>{
            this.options = new NgUploaderOptions({
                url: this.app.api()+'auth/uploadAvatar',
                filterExtensions: true,
                allowedExtensions: ['jpg', 'png'],
                data: { _id: _id },
                autoUpload: false,
                fieldName: 'file',
                fieldReset: true,
                maxUploads: 2,
                method: 'POST',
                previewUrl: true,
                withCredentials: false
            });
        }) 

        this.inputUploadEvents = new EventEmitter<string>();
    } 

    beforeUpload(uploadingFile: UploadedFile): void { 
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            this.response = 'File is too large is limit to 2MB!';
        }
    }

    handleUpload(data: any) {
        setTimeout(() => {
            this.zone.run(() => {
                this.resp = data;
                if (data && data.response) {
                    this.resp = JSON.parse(data.response); 
                    this.gbview.endGobalView();
                    this.auth.active.emit(true);   
                }
            });
        });
    }

    handlePreviewData(data: any) {
        this.previewData = data;
    }

    closeGobalView(){
        this.gbview.endGobalView();
    }

    submit(){  
        if(this.app.isEmpty(this.previewData)){
            this.response = 'กรุณาเลือกรูปภาพ !'
            
        }else{  
            this.response = 'กรุณารอสักครู่...'
            this.inputUploadEvents.emit('startUpload'); 
            
        } 
    }
}
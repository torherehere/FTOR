import { CityRadioSV } from './../api/cityradio';
import { Appfn } from './../appfn';
import { SettopbarService } from './../../../service/settopbar.service';
import { Component, OnInit, EventEmitter, NgZone, Inject } from '@angular/core';
import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import swal from 'sweetalert2'

@Component({
    selector: 'ads',
    templateUrl: './ads.html', 
})

export class Ads implements OnInit {
    
    app = new Appfn();
    response: any;
    link: any;
    listDataAds: any;

    // option upload
    options: NgUploaderOptions;  
    sizeLimit: number = 2000000; // 2MB
    previewData: any; 
    inputUploadEvents: EventEmitter<string>;
    resp: any; 

    constructor(private setsv: SettopbarService, @Inject(NgZone) private zone: NgZone, private cityradio: CityRadioSV){
        this.options = new NgUploaderOptions({
            url: this.app.api()+'cityradio/uploadAds',
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
        this.setsv.settitle("Ads");
        this.getDataAds();
    }

    getDataAds(){
        this.cityradio.getDataAds().subscribe(data=>{
            this.listDataAds = data;
        })
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
                        link: this.link,
                        date: this.app.getTime(),
                    } 

                    this.cityradio.updateDataAds(this.resp._id, dataArr).subscribe(data=>{
                        this.clearData(); 
                        this.getDataAds();
                    })
                }
            });
        });
    }

    submit() {
        this.response = ''; 
        if(!this.app.isEmpty(this.link) && !this.app.isEmpty(this.previewData)){
            this.inputUploadEvents.emit('startUpload');
                
        }else{
            this.response = 'กรุณาป้อนข้อมูลให้ครบ !'
        } 
    }

    clearData(){
        this.link = '';
        this.previewData = '';
        this.resp = '';
    }

    linkTap(link: string){
        var newWindow = window.open(link); 
    }

    delAds(_id: any){
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'

        }).then(()=>{
            swal('Deleted!', 'Your imaginary file has been deleted.', 'success')
            this.cityradio.delAds(_id).subscribe(data=>{
                this.getDataAds();
            })

        }, (dismiss)=>{
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal( 'Cancelled', 'Your imaginary file is safe :)', 'error')
            }
        }) 
    }

}

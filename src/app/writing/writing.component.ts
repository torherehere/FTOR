import { Router } from '@angular/router';
import { BlogSV } from './../api/blog';
import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import { AuthSV } from './../api/auth';
import { CatalogSV } from './../api/catalog';
import { Appfn } from './../appfn';
import { Component, OnInit, EventEmitter, NgZone, Inject } from '@angular/core';
import { SettopbarService } from './../../../service/settopbar.service';
@Component({
    selector: 'app-writing',
    templateUrl: './writing.component.html'
})
export class WritingComponent implements OnInit {

    app = new Appfn();
    _id: any = null;
    uid: any;
    avatar: string;
    title: string;
    fullname: string; 
    catalog_id: any;
    listCatalog: any; 
    tags: any = [];//['Car', 'Bus', 'Train']; 
    content: any;
    resultEditor: any;
    response: any;
    dataBlog: any; 
    dateNow: any = new Date();

    // potion upload
    options: NgUploaderOptions;  
    sizeLimit: number = 2000000; // 2MB
    previewData: any; 
    inputUploadEvents: EventEmitter<string>;
    resp: any; 

    constructor(private svtopbar: SettopbarService, private catalog: CatalogSV, private auth: AuthSV, @Inject(NgZone) private zone: NgZone, private blog: BlogSV, private router: Router){
        this.options = new NgUploaderOptions({
            url: this.app.api()+'blog/uploadCoverBlog',
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
        this.svtopbar.settitle("Writing...")
        if(this.auth.checkLogin()){
            this.getSession(); 
            this.catalog.getAllCatalog().subscribe(data=>{
                this.listCatalog = data
            })
        } 
    }

    getSession(){
        this.auth.getSession(this.auth.getToken()).subscribe(data=>{ 
            if(data){
                this.getUser(data._id); 
            } 
        })
    }

    titleOptions: Object = { 
        imageManagerLoadURL: this.app.api()+'blog/imagemanager',
        imageUploadURL: this.app.api()+'blog/upload_image', 
        imageManagerDeleteURL: this.app.api()+'blog/delete-picture', 
        placeholderText: 'Edit Your Content Here!',
        charCounterCount: true,  //แสดงจำนวนตัวอักษร
        toolbarInline: false, //ทำให้เหลือบรรทัดเดียว
        toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'quote', 'insertHR', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'] ,
        disableRightClick: true, //ห้ามคลิกขวา
        heightMin: 600, 
    } 
 
    getUser(_id: any){
        this.auth.getUser(_id).subscribe(data=>{  
            this.uid = data._id;
            this.fullname = data.first_name+' '+data.last_name
            this.avatar = this.app.api()+data.avatar.path;  
        })
    } 

    beforeUpload(uploadingFile: UploadedFile): void {
        console.log(112345678)
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
                        staff_id: this.uid,
                        title: this.title,
                        slug: this.app.urlEncode(this.title),
                        description: this.content,
                        catalog_id: this.catalog_id,
                        tags: this.tags,
                    }

                    this.blog.updateBlog(this.resp._id, dataArr).subscribe(data=>{
                        this.clearData(); 
                        this.router.navigate(['/blog'])
                    })  
                }
            });
        });
    }

    submit() {
        this.response = ''; 
        if(!this.app.isEmpty(this.title) && !this.app.isEmpty(this.catalog_id) && !this.app.isEmpty(this.tags) && !this.app.isEmpty(this.content) && !this.app.isEmpty(this.previewData)){
            this.inputUploadEvents.emit('startUpload');
                
        }else{
            this.response = 'กรุณาป้อนข้อมูลให้ครบ !'
        } 
    }

    clearData(){
        this.title = '';
        this.catalog_id = '';
        this.tags = [];
        this.content = '';
        this._id = null;
        this.previewData = '';
    }
}

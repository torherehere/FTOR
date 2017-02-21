import { AuthSV } from './../api/auth';
import { CatalogSV } from './../api/catalog';
import { SettopbarService } from './../../../service/settopbar.service';
import { BlogSV } from './../api/blog';
import { Appfn } from './../appfn';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, NgZone, OnInit, Inject } from '@angular/core';
import { NgUploaderOptions, UploadedFile, UploadRejected } from 'ngx-uploader';

@Component({
    selector: 'edit-blog',
    templateUrl: './editblog.html',
})

export class EditBlog{

    app = new Appfn();
    _id: any = null;
    uid: any;
    avatar: string;
    avatar_def: string = '../assets/images/Avatar.png';
    title: string;
    fullname: string; 
    catalog_id: any;
    listCatalog: any; 
    tags: any = [];//['Car', 'Bus', 'Train']; 
    content: any;
    resultEditor: any;
    response: any;
    dataBlog: any; 
    date: any;
    owner: any;

    // potion upload
    options: NgUploaderOptions;  
    sizeLimit: number = 2000000; // 2MB
    previewData: any; 
    inputUploadEvents: EventEmitter<string>;
    resp: any; 

    constructor(private svtopbar: SettopbarService, private catalog: CatalogSV, private auth: AuthSV, @Inject(NgZone) private zone: NgZone, private blog: BlogSV, private router: Router, private route: ActivatedRoute){
        this.route.params.subscribe(data=>{
            this._id = data['_id'];
        })
        
        this.options = new NgUploaderOptions({
            url: this.app.api()+'blog/updateCoverBlog',
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

    ngOnInit() {
        this.svtopbar.settitle("Writing...")
        if(this.auth.checkLogin()){
            this.getSession();
            this.getAllCatalog(); 
            this.getBlogById();
        }  
    }

    getSession(){
        this.auth.getSession(this.auth.getToken()).subscribe(data=>{ 
            this.uid = data._id;
            this.getUser(); 
        })
    }

    getUser(){
        this.auth.getUser(this.uid).subscribe(data=>{   
            this.fullname = data.first_name+' '+data.last_name
            this.avatar = (data.avatar) ? this.app.api()+data.avatar.path : this.avatar_def;  
        })
    } 

    getAllCatalog(){
        this.catalog.getAllCatalog().subscribe(data=>{
            this.listCatalog = data
        })
    }

    getBlogById(){
        this.blog.getBlogById(this._id).subscribe(data=>{
            this.owner = data.staff_id;
            this.previewData = this.app.api()+data.img;
            this.catalog_id = data.catalog_id._id;
            this.title = data.title;
            this.content = data.description;
            this.tags = data.tags;
            this.date = this.app.convertTime(data.date);

            if(this.owner != this.uid){
                this.router.navigate(['/blog'])
            }
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
                }
            });
        });
    }

    submit() {
        this.response = ''; 
        if(!this.app.isEmpty(this.title) && !this.app.isEmpty(this.catalog_id) && !this.app.isEmpty(this.tags) && !this.app.isEmpty(this.content) && !this.app.isEmpty(this.previewData)){
            this.inputUploadEvents.emit('startUpload');

            var dataArr = {
                staff_id: this.uid,
                title: this.title,
                slug: this.app.urlEncode(this.title),
                description: this.content,
                catalog_id: this.catalog_id,
                tags: this.tags,
            }

            this.blog.updateBlog(this._id, dataArr).subscribe(data=>{
                this.clearData(); 
                this.router.navigate(['/blog'])
            })  
                
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
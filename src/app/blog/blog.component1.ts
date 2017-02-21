import { SettopbarService } from './../../../service/settopbar.service';
import { CatalogSV } from './../api/catalog';
import { BlogSV } from './../api/blog';
import { Appfn } from './../appfn';
import { Router, ActivatedRoute } from '@angular/router'; 
import { AuthSV } from './../api/auth';
import { Component, OnInit, NgZone, Inject, EventEmitter } from '@angular/core'; 
import { NgUploaderOptions, UploadedFile, UploadRejected } from 'ngx-uploader'; 
import swal from 'sweetalert2'
 
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',  
})

export class BlogComponent implements OnInit {

  app = new Appfn();
  _id: any = null;
  uid: any;
  title: string;
  fullname: string; 
  catalog_id: any;
  listCatalog: any; 
  tags: any = [];//['Car', 'Bus', 'Train']; 
  content: any;
  resultEditor: any;
  response: any;
  dataBlog: any; 

  options: NgUploaderOptions;  
  sizeLimit: number = 1000000; // 1MB
  previewData: any;
  errorMessage: string;
  inputUploadEvents: EventEmitter<string>;
  resp: any; 

  testLoop =[];

  constructor(private svtitleset: SettopbarService, private auth: AuthSV, private catalog: CatalogSV, private router: Router, private blog: BlogSV, @Inject(NgZone) private zone: NgZone, private param: ActivatedRoute) { 
      this.param.params.subscribe(data=>{ 
      })
      
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
       this.testLoop = [{},{},{},{},{},{},{},{},{},{},{},{}]
  }
 
  ngOnInit() {
      this.svtitleset.settitle("Blog");
      if(this.auth.checkLogin()){
          this.auth.getSession(this.auth.getToken()).subscribe(data=>{ 
              this.getUser(data._id); 
          })

          this.catalog.getAllCatalog().subscribe(data=>{
              this.listCatalog = data
          })
      } 
  } 

  beforeUpload(uploadingFile: UploadedFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      this.errorMessage = 'File is too large!';
    }
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
                this.getAllBlogByUser();
            })  
        }
      });
    });
  }

  handlePreviewData(data: any) {
    this.previewData = data;
  }

  titleOptions: Object = { 
        imageManagerLoadURL: this.app.api()+'blog/imagemanager',
        imageUploadURL: this.app.api()+'blog/upload_image', 
        imageManagerDeleteURL: this.app.api()+'blog/delete-picture',
        // events : {
        //     'froalaEditor.image.removed' :  (e, editor,$img) =>  {
        //         this.blog.postApi('blog/delete-picture', {src: $img.attr('src')}).subscribe(data => {
        //             console.log(data);
        //         }); 
        //     }, 
        // },

        placeholderText: 'Edit Your Content Here!',
        charCounterCount: true,  //แสดงจำนวนตัวอักษร
        toolbarInline: false, //ทำให้เหลือบรรทัดเดียว
        toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'quote', 'insertHR', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'] ,
        disableRightClick: true, //ห้ามคลิกขวา
        heightMin: 400,

  } 

  getUser(_id: any){
      this.auth.getUser(_id).subscribe(data=>{  
          this.uid = data._id;
          this.fullname = data.fullname; 

          this.getAllBlogByUser();
      })
  } 

  logout(){
      this.auth.removeToken(); 
      this.router.navigate(['/login']);
  } 

  submit() {
      this.response = ''; 
      if(!this.app.isEmpty(this.title) && !this.app.isEmpty(this.catalog_id) && !this.app.isEmpty(this.tags) && !this.app.isEmpty(this.content) && !this.app.isEmpty(this.previewData)){
            this.inputUploadEvents.emit('startUpload');
            
      }else{
            this.response = 'กรุณาป้อนข้อมูลให้ครบ !'
      } 
  }

  getAllBlogByUser(){
      this.blog.getAllBlogByUser(this.uid).subscribe(data=>{ 
        this.dataBlog = data; 
      })
  }

  clearData(){
      this.title = '';
      this.catalog_id = '';
      this.tags = [];
      this.content = '';
      this._id = null;
      this.previewData = '';
  }

  edit(_id: any){
      this.blog.getBlogById(_id).subscribe(data=>{ 
          this.title = data.title;
          this.catalog_id = data.catalog_id._id;
          this.tags = data.tags;
          this.content = data.description;
          this._id = data._id;
          this.previewData = this.app.api()+data.img;  
          this.resp = false;
      })
  }

  update(){
      var dataArr = {
          title: this.title,
          slug: this.app.urlEncode(this.title),
          catalog_id: this.catalog_id,
          tags: this.tags,
          description: this.content, 
      }    

      this.blog.updateBlog(this._id, dataArr).subscribe(data=>{
          this.clearData();
          this.getAllBlogByUser();
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
            this.blog.deleteBlog(_id).subscribe(data=>{
                this.getAllBlogByUser();
            })

        }, (dismiss)=>{
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal( 'Cancelled', 'Your imaginary file is safe :)', 'error')
            }
        })
  }  

}

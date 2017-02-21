import { AuthSV } from './../api/auth';
import { CommentSV } from './../api/comment';
import { BlogSV } from './../api/blog';
import { Appfn } from './../appfn';
import { CatalogSV } from './../api/catalog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-liststory',
  templateUrl: './liststory.html',   
  styleUrls: ['liststory.css'] 
})

export class ListstoryComponent implements OnInit {

  app = new Appfn();
  title: string;
  dataBlog: any = []; 
  catalog_name: string;
  dateTime: any;
  tags: any;

  uid: any;
  message: string;
  sub_message: string;
  blog_id: any;

  listComment: any;
  fullname: any;
  comment_id: any;

  constructor(private params: ActivatedRoute, private catalog: CatalogSV, private router: Router, private blog: BlogSV, private comment: CommentSV, private auth: AuthSV) { }
 
  ngOnInit() {
    this.auth.getSession(this.auth.getToken()).subscribe(data=>{
        this.uid = data._id; 

        this.auth.getUser(this.uid).subscribe(user=>{
            this.fullname = user.first_name+' '+user.last_name;
        })
        
    })

    this.params.params.subscribe(data=>{ 
        this.checkUrl(data['catalog'], data['title'], (result)=>{    
            if(result.status){ 
                this.title = result.dataBlog.title;
                this.dataBlog.push(result.dataBlog) 
                this.catalog_name = result.dataBlog.catalog_id.name;
                this.dateTime = result.dataBlog.date;
                this.tags = result.dataBlog.tags;
                this.blog_id = result.dataBlog._id;
                
                this.getComment();
            }else{
                this.router.navigate(['/dashboard']);
            }
        })
    }) 
  } 

  checkUrl(catName: string, title: string, cb: any){
    this.catalog.getCatalogByName(catName).subscribe(dataCat=>{
        if(this.app.isEmpty(dataCat)){  
            cb({status: false});
            
        }else{
            this.blog.getTitleSlugBySlug(title).subscribe(dataBlog=>{
                if(this.app.isEmpty(dataBlog)){ 
                    cb({status: false});
                }else{
                    cb({status: true, dataBlog: dataBlog});
                }
            })
        }
    })
  }

  linkTags(tag: string){
      console.log(tag)
  }

  addComment(){
      this.comment.addComent(this.uid, this.blog_id, this.message, '').subscribe(data=>{
            this.getComment();
            this.clearData();
      })
  }

  addSubComment(reply_id: any){ 
      this.comment.addComent(this.uid, this.blog_id, this.sub_message, reply_id).subscribe(data=>{
            this.getComment();
            this.clearData();
      }) 
  }

  getComment(){
      this.comment.getCommentByBlogId(this.blog_id).subscribe(data=>{
          console.log(data)
          this.listComment = data;
      })
  }

  clearData(){
      this.message = '';
      this.sub_message = '';
  }

  reply(_id: any){
      this.comment_id = _id;
      this.clearData();
  }
}

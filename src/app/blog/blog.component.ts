import { Router } from '@angular/router';
import { AuthSV } from './../api/auth';
import { SettopbarService } from './../../../service/settopbar.service';
import { BlogSV } from './../api/blog';
import { Appfn } from './../appfn';
import { Component, OnInit} from '@angular/core'; 
import swal from 'sweetalert2'

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',  
})

export class BlogComponent{

    app = new Appfn();  
    listBlog: any; 
    listBlog2: any; 
    uid: any;
    dd: any
    cc: any
    search: string;

    constructor(private svtitleset: SettopbarService, private auth: AuthSV, private blog: BlogSV, private router: Router) {} 

    ngOnInit(){ 
        this.svtitleset.settitle("Blog");
        this.dd = new Date();
        this.cc = this.app.getTime();


        if(this.auth.checkLogin()){
            this.getSession();  
        }else{
            this.router.navigate(['/login']);
        }
    }

    eventSearch(){
        if(!this.app.isEmpty(this.search) && this.search.length >= 3){ 
                this.blog.searchBlog(this.uid, this.search).subscribe(data=>{ 
                    this.listBlog = data;
                })    
        }else{
                this.listBlog = this.listBlog2;
        } 
    }

    getSession(){
        this.auth.getSession(this.auth.getToken()).subscribe(data=>{
            if(data){
                this.uid = data._id;
                this.getAllBlog(); 
            } 
        })
    }

    getAllBlog(){ 
        this.blog.getAllBlogByUser(this.uid).subscribe(data=>{  
            this.listBlog = data;
            this.listBlog2 = data;
        })
    }

    link(slug: string){
        var newWindow = window.open('http://ashita.io:3003/blog/content/'+slug); 
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
                this.getAllBlog();
            })

        }, (dismiss)=>{
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal( 'Cancelled', 'Your imaginary file is safe :)', 'error')
            }
        })
  }  

}

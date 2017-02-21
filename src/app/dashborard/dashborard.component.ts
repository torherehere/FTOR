import { SettopbarService } from './../../../service/settopbar.service';
import { Appfn } from './../appfn';
import { CatalogSV } from './../api/catalog';
import { Router } from '@angular/router';
import { AuthSV } from './../api/auth'; 
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'

@Component({
  selector: 'app-dashborard',
  templateUrl: './dashborard.component.html',
})

export class DashborardComponent implements OnInit {

  app = new Appfn();
  list: any;
  listLv2: any;
  name: string;
  _id: any = null;
  parent_id: any;
  lv2_name: any;
  lv2_id: any;

  constructor(private svtitleset: SettopbarService, private auth: AuthSV, private router: Router, private catalog: CatalogSV){}

  ngOnInit() {
    if(this.auth.checkLogin()){
        this.svtitleset.settitle('Dashboard');
    }else{
        this.router.navigate(['/login']);
    } 

    this.getAllCatalog(); 
    this.getCatLv2();
  }

  submit(){  
    if(!this.app.isEmpty(this.name)){
        this.catalog.addCatalog(this.name, this.app.urlEncode(this.name), '').subscribe(data=>{
            this.getAllCatalog();
            this.clearData();
        }) 
    } 
  }

  getAllCatalog(){
      this.catalog.getAllCatalog().subscribe(data=>{
          this.list = data;
      })
  }

  getCatLv2(){
      this.catalog.getCatLv2().subscribe(data=>{ 
          this.listLv2 = data;
      })
  }

  clearData(){
    this.name = '';
    this.lv2_name = '';
    this._id = null;
    this.lv2_id = null;
  }

  edit(_id: any){
    this.catalog.getCatalogById(_id).subscribe(data=>{
        this.name = data.name;
        this._id = data._id;
    })
  }

  update(){
    var dataArr = {
        name: this.name,
        slug: this.app.urlEncode(this.name),
        parent_id: '',
    }

    this.catalog.updateCatalog(this._id, dataArr).subscribe(data=>{
        this.getAllCatalog();
        this.clearData();
    })
  }

  // delete(_id: any){
  //   this.catalog.delCatalog(_id).subscribe(data=>{
  //       this.getAllCatalog();
  //   })
  // }

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
          this.catalog.delCatalog(_id).subscribe(data=>{
              this.getAllCatalog();
              this.getCatLv2();
              this.clearData(); 
          })

      }, (dismiss)=>{
          // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
          if (dismiss === 'cancel') {
              swal( 'Cancelled', 'Your imaginary file is safe :)', 'error')
          }
      })
  }  

  submitLv2(){
      if(!this.app.isEmpty(this.lv2_name)){
          this.catalog.addCatalog(this.lv2_name, this.app.urlEncode(this.lv2_name), this.parent_id).subscribe(data=>{ 
              this.getCatLv2();
              this.clearData();
          })
      } 
  }

  editLv2(_id: any){
      this.catalog.getCatalogById(_id).subscribe(data=>{
          this.lv2_name = data.name;
          this.parent_id = data.parent_id;
          this.lv2_id = data._id;
      })
  }

  updateLv2(){
      var dataArr = {
          name: this.lv2_name,
          slug: this.app.urlEncode(this.lv2_name),
          parent_id: this.parent_id,
      }

      this.catalog.updateCatalog(this.lv2_id, dataArr).subscribe(data=>{
          this.getCatLv2();
          this.clearData();
      })
  }
}

import { DjTimeSV } from './../api/djtime';
import { Appfn } from './../appfn';
import { SettopbarService } from './../../../service/settopbar.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'

@Component({
    selector: 'djtime',
    templateUrl: './djtime.html', 
})

export class Djtime implements OnInit {

    app = new Appfn();
    time: string;
    endtime: string;
    name: string;
    week: string;
    dataDJ: any;
    dataTableDJ: any;
    response: any;
    _id: any;

    constructor(private setsv: SettopbarService, private djtime: DjTimeSV){}

    ngOnInit() {
        this.setsv.settitle("Djtime"); 
        this.getData();
        this.getDataTable();
    } 

    submit(){  
        if(this.app.isEmpty(this.time) || this.app.isEmpty(this.endtime) || this.app.isEmpty(this.name) || this.app.isEmpty(this.week)){
            this.response = 'กรุณากรอกข้อมูล !'
        }else{
            this.djtime.addData(this.time, this.endtime, this.name, this.week).subscribe(data=>{ 
                this.response = 'บันทึกสำเร็จ !'; 
                this.getData();
                this.clearData();
            })
        } 
    }

    clearData(){
        this._id = null;
        this.time = '';
        this.endtime = '';
        this.name = '';
        this.week = '';
        this.response = '';
    }

    getData(){
        this.djtime.getData().subscribe(data=>{
            this.dataDJ = data;
        })
    }

    getDataTable(){
        this.djtime.getDataTable().subscribe(data=>{
            this.dataTableDJ = data;
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
          this.djtime.delData(_id).subscribe(data=>{
              this.getData();
          })

      }, (dismiss)=>{
          // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
          if (dismiss === 'cancel') {
              swal( 'Cancelled', 'Your imaginary file is safe :)', 'error')
          }
      })
    }

    edit(_id: any){
        this.djtime.findDataById(_id).subscribe(data=>{
            this._id = data._id;
            this.time = data.time_start;
            this.endtime = data.time_end;
            this.name = data.name;
            this.week = data.week;
        })
    }

    update(){
        if(this.app.isEmpty(this.time) || this.app.isEmpty(this.endtime) || this.app.isEmpty(this.name) || this.app.isEmpty(this.week)){
            this.response = 'กรุณากรอกข้อมูล !'
        }else{
            var dataArr = {
                time_start: this.time, 
                time_end: this.endtime,
                name: this.name,
                week: this.week,
            }

            this.djtime.updateData(this._id, dataArr).subscribe(data=>{
                this.response = 'บันทึกสำเร็จ !';
                this.getData(); 
                this.clearData(); 
            })
        }
    }

}

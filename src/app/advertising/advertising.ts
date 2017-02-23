import { CityRadioSV } from './../api/cityradio';
import { Appfn } from './../appfn';
import { SettopbarService } from './../../../service/settopbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'advertising',
    templateUrl: './advertising.html', 
})

export class Advertising implements OnInit {

    app = new Appfn();
    content: any;
    response: any;

    constructor(private setsv: SettopbarService, private cityradio: CityRadioSV){}

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
        this.setsv.settitle("Advertising");
        this.getData();
    }

    getData(){
        this.cityradio.getData().subscribe(data=>{
            this.content = data.advertising;
        })
    }

    submit(){
        if(this.app.isEmpty(this.content)){
            this.response = "กรุณากรอกข้อมูล..."

        }else{
            this.cityradio.updateData({advertising: this.content}).subscribe(data=>{
                this.response = "บันทึกสำเร็จ..."
            })
        }  
    }

}

import { Appfn } from './../../appfn';
import { AuthSV } from './../../api/auth';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-jobinfo',
    templateUrl: './jobinfo.component.html'
})

export class JobinfoComponent implements OnInit {

    app = new Appfn();
    uid: any;
    jobTitle: string;
    saraly: number;
    salaryTerm: number;
    dateOfHire: any;
    response: any;
    session_id: any;
    permission: any;

    constructor(private auth: AuthSV){}

    ngOnInit(){
        this.uid = this.auth.owner.uid
        this.getUser();
        this.getSession();
    }

    getUser(){
        this.auth.getUser(this.uid).subscribe(data=>{ 
            this.jobTitle = data.job_title;
            this.saraly = data.saraly;
            this.salaryTerm = data.saraly_term;
            this.dateOfHire = this.app.changeDateYMD(data.dateOfHire); //'2011-08-19'

        })
    }

    getSession(){
        this.auth.getSession(this.auth.getToken()).subscribe(data=>{
            this.session_id = data._id;
            this.permission = data.permission;
        })
    }

    submit(){
        var dataArr = {
            job_title: this.jobTitle,
            saraly: this.saraly,
            saraly_term: this.salaryTerm,
            dateOfHire: this.app.changeDateTimeStamp(this.dateOfHire),
        }

        this.auth.updateUser(this.uid, dataArr).subscribe(data=>{
            this.response = 'บันทึกสำเร็จ !'
        }) 
 
    }

}

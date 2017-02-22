import { SettopbarService } from './../../../service/settopbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'contact',
    templateUrl: './contact.html', 
})

export class Contact implements OnInit {

    constructor(private setsv: SettopbarService){}

    ngOnInit() {
        this.setsv.settitle("Contact");
    }

}

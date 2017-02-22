import { SettopbarService } from './../../../service/settopbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'advertising',
    templateUrl: './advertising.html', 
})

export class Advertising implements OnInit {

    constructor(private setsv: SettopbarService){}

    ngOnInit() {
        this.setsv.settitle("Advertising");
    }

}

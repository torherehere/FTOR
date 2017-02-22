import { SettopbarService } from './../../../service/settopbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'djtime',
    templateUrl: './djtime.html', 
})

export class Djtime implements OnInit {

    constructor(private setsv: SettopbarService){}

    ngOnInit() {
        this.setsv.settitle("Djtime");
    }

}

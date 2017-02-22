import { SettopbarService } from './../../../service/settopbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ads',
    templateUrl: './ads.html', 
})

export class Ads implements OnInit {

    constructor(private setsv: SettopbarService){}

    ngOnInit() {
        this.setsv.settitle("Ads");
    }

}

import { SettopbarService } from './../../../service/settopbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'tophitz',
    templateUrl: './tophitz.html', 
})

export class Tophitz implements OnInit {

    constructor(private setsv: SettopbarService){}

    ngOnInit() {
        this.setsv.settitle("Tophitz");
    }

}

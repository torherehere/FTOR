import { GobalviewService } from './../../../../service/gobalview.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sendinactive',
  templateUrl: './sendinactive.component.html',
})
export class SendinactiveComponent implements OnInit {

  constructor(private gbview: GobalviewService) { }

  ngOnInit() {
  }

  protected closeGobalView(){
    this.gbview.endGobalView();
  }

}

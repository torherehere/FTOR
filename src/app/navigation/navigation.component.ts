import { NavigationService } from './../../../service/navigation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  nav:boolean;
  constructor(private svnav: NavigationService) { }

  ngOnInit() {
  }

}

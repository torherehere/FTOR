import { NavigationService } from './../../service/navigation.service';
import { SettopbarService } from './../../service/settopbar.service';
import { GobalviewService } from './../../service/gobalview.service';
import { Component, ViewContainerRef, ViewChild, EventEmitter } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../assets/styles.scss'] 
})
export class AppComponent {
  title = 'app works!';
  
  @ViewChild('GobalContainer', {read: ViewContainerRef})
  GobalContainer: ViewContainerRef;
  @ViewChild('GobalContent', {read: ViewContainerRef})
  GobalContent: ViewContainerRef;
  
  constructor(private svGobalView: GobalviewService, private svtopbar:SettopbarService, private svnav: NavigationService){} 

  ngOnInit(){
      this.svGobalView.setGobalElement(this.GobalContainer, this.GobalContent);
  }

}

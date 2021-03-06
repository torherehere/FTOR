import { CloneMusic } from './tophitz/clonemusic/clonemusic';
import { EditMusic } from './tophitz/editmusic/editmusic';
import { EditListHits } from './listhits/editlisthits/editlisthits';
import { ApiSV } from './api/api';
import { Listhits } from './listhits/listhits';
import { HitsSV } from './api/hits';
import { Ads } from './ads/ads';
import { Partner } from './partner/partner';
import { DjTimeSV } from './api/djtime';
import { CityRadioSV } from './api/cityradio'; 
import { Tophitz } from './tophitz/tophitz';
import { Djtime } from './djtime/djtime';
import { Contact } from './contact/contact';
import { Advertising } from './advertising/advertising';
import { EditBlog } from './editblog/editblog';
import { profile_routes } from './profile/profile.routing';
import { EditaVatar } from './profile/editavatar/editavatar';
import { SafeHtmlPipe } from './safehtml';
import { ListstoryComponent } from './liststory/liststory'; 
import { CommentSV } from './api/comment';
import { BlogSV } from './api/blog';
import { PositionSV } from './api/position';
import { CatalogSV } from './api/catalog';
import { NkSlide, NookSlides } from './../directive/slide.component';
import { BackdropService } from './../../service/backdrop.service';
import { GobalviewService } from './../../service/gobalview.service';
import { SettopbarService } from './../../service/settopbar.service';
import { NavigationService } from './../../service/navigation.service';
import { AuthSV } from './api/auth';
import { Register } from './auth/register/register';
// import { Login } from './auth/login/login'; 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';  
import { NgUploaderModule } from 'ngx-uploader';
import { RlTagInputModule } from 'angular2-tag-input';  
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg'; 
import { TimeAgoPipe } from 'time-ago-pipe';  
import { Typeahead } from 'ng2-typeahead';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { TopbarComponent } from './topbar/topbar.component';
import { DashborardComponent } from './dashborard/dashborard.component';
import { ProjectComponent } from './project/project.component';
import { TeamComponent } from './team/team.component';
import { BlogComponent } from './blog/blog.component';
import { Page404Component } from './page404/page404.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { SlideDirective } from './../directive/slide.directive';
import { AddmembersComponent } from './team/sub/addmembers.component';
import { ProfileComponent } from './profile/profile.component';
import { GeneralinfoComponent } from './profile/sub/generalinfo.component';
import { AccountsettingComponent } from './profile/sub/accountsetting.component';
import { JobinfoComponent } from './profile/sub/jobinfo.component';
import { TimelineComponent } from './profile/sub/timeline.component';
import { SendinactiveComponent } from './team/sub/sendinactive.component';
import { RatioDirective } from './../directive/ratio.directive';
import { LoginComponent } from './login/login.component';
import { MaincontentDirective } from './../directive/maincontent.directive';
import { WritingComponent } from './writing/writing.component';

let routing = [
  ...profile_routes,
  {path:'login',component:LoginComponent},
  {path:'',component: DashborardComponent},
  {path:'dashboard', component: DashborardComponent},
  {path:'project',component: ProjectComponent},
  {path:'advertising',component: Advertising}, 
  {path:'djtime',component: Djtime},
  {path:'listhits/:_id',component: Listhits},
  {path:'ads',component: Ads},
  {path:'contact',component: Contact}, 
  {path:'team',component: TeamComponent},
  {path:'tophitz',component: Tophitz}, 
  {path:'partner',component: Partner}, 
  {path:'blog',component: BlogComponent},
  {path:'writing',component: WritingComponent},
  {path:'editblog/:_id', component:EditBlog},
  {path:'liststory/:catalog/:title', component: ListstoryComponent},
  {path:'**',component:Page404Component}, 

] 

@NgModule({
  declarations: [
    AppComponent,
    // Login,
    Register,
    NavigationComponent,
    TopbarComponent,
    DashborardComponent,
    ProjectComponent,
    Advertising,
    TeamComponent,
    BlogComponent,
    Page404Component,
    BackdropComponent,  
    SlideDirective,
    AddmembersComponent,
    NookSlides,
    NkSlide,
    ProfileComponent,
    EditBlog,
    ListstoryComponent, 
    SafeHtmlPipe,
    TimeAgoPipe,
    TimelineComponent,
    GeneralinfoComponent,
    AccountsettingComponent,
    JobinfoComponent,
    EditaVatar,
    SendinactiveComponent,
    RatioDirective,
    LoginComponent,
    MaincontentDirective,
    WritingComponent,
    Contact,
    Djtime,
    Tophitz,
    Partner,
    Ads,
    Typeahead,
    Listhits,
    EditListHits,
    EditMusic,
    CloneMusic
  ],
  imports: [
    RouterModule.forRoot(routing),
    BrowserModule,
    FormsModule,
    HttpModule,
    NgUploaderModule,
    RlTagInputModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(), 
  ],
  providers: [
    AuthSV,
    SettopbarService,
    GobalviewService,
    BackdropService,
    NavigationService,
    CookieService,
    CatalogSV, 
    PositionSV,
    BlogSV, 
    CommentSV, 
    CityRadioSV,
    DjTimeSV,
    HitsSV,
    ApiSV,
  ],
  entryComponents: [
    AddmembersComponent,
    SendinactiveComponent,
    EditaVatar,
    EditListHits,
    EditMusic,
    CloneMusic
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

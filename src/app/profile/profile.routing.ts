import { GeneralinfoComponent } from './sub/generalinfo.component';
import { AccountsettingComponent } from './sub/accountsetting.component';
import { JobinfoComponent } from './sub/jobinfo.component';
import { ProfileComponent } from './profile.component';
import { TimelineComponent } from './sub/timeline.component';

import { Routes } from '@angular/router';


export const profile_routes:Routes = [  
    { path: 'profile/:_id', component: ProfileComponent,
        children:[
            {path: '', component: TimelineComponent },
            {path: 'timeline', component: TimelineComponent },
            {path: 'generalinfo', component: GeneralinfoComponent },
            {path: 'accountsetting', component: AccountsettingComponent },
            {path: 'jobinfo', component: JobinfoComponent },
        ]
    },   
];

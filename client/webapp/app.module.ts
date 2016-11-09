import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RootComponent } from './root.component';
import { RepositoryListComponent } from './repositoryList.component';
import { FollowerListComponent } from './followerList.component';
import { FollowingListComponent } from './followingList.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: AppComponent}
    ])
  ],
  declarations: [
    RootComponent, 
    AppComponent,
    RepositoryListComponent,
    FollowerListComponent,
    FollowingListComponent
  ],
  bootstrap: [ RootComponent ]
})
export class AppModule { }


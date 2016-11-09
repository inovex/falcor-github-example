import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FalcorService } from './service/falcor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'following-list',
  template: `<h4 class="h4">Following</h4>
    <ul class="list-group">
      <li class="list-group-item clickable" (click)="selectUser(following)" *ngFor="let following of followings">{{following.name}}<span class="pull-right">Stars: {{following.stars}}</span></li>
    </ul>` 
})
export class FollowingListComponent implements OnChanges { 
  @Input()
  login: string;

  constructor(private falcorService: FalcorService, private router: Router) {}
  private followings = [];

  ngOnChanges(changes: SimpleChanges) {
    if (this.login && changes['login'].currentValue !== changes['login'].previousValue) {
        this.falcorService
          .get('user["' + this.login + '"].following[0..10]["name", "login", "stars"]')
          .then((response) => {
            this.followings = [];
            for (let key in response.json.user[this.login].following) {
              this.followings.push(response.json.user[this.login].following[key]);
            }
          });
      }
  }

  selectUser(user) {
    this.router.navigate(['/'], { queryParams: { 'login': user.login } });
  }
}

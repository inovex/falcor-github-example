import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FalcorService } from './service/falcor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'follower-list',
  template: `<h4 class="h4">Follower</h4>
    <ul class="list-group">
      <li class="list-group-item clickable" (click)="selectUser(follower)" *ngFor="let follower of followers">{{follower.name}} <span class="pull-right">Stars: {{follower.stars}}</span></li>
    </ul>`
})
export class FollowerListComponent implements OnChanges {
  @Input()
  login: string;

  constructor(private falcorService: FalcorService, private router: Router) { };
  private followers = [];

  ngOnChanges(changes: SimpleChanges) {
    if (this.login && changes['login'].currentValue !== changes['login'].previousValue) {
      this.falcorService
        .get('user["' + this.login + '"].follower[0..10]["name", "login", "stars"]')
        .then((response) => {
          this.followers = [];
          for (let key in response.json.user[this.login].follower) {
            this.followers.push(response.json.user[this.login].follower[key]);
          }
        });
    }
  }

  selectUser(user) {
    this.router.navigate(['/'], { queryParams: { 'login': user.login } });
  }
}

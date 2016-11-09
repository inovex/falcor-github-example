import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FalcorService } from './service/falcor.service';

@Component({
  selector: 'repository-list',
  template: `<h4 class="h4">Repositories</h4>
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let repository of repositories">{{repository.name}}</li>
    </ul>` 
})
export class RepositoryListComponent implements OnChanges { 
  @Input()
  login: string;
  constructor(private falcorService: FalcorService) {};
  private repositories = [];
  ngOnChanges(changes: SimpleChanges) {
    if (this.login && changes['login'].currentValue !== changes['login'].previousValue) {
      this.falcorService
        .get('user["' + this.login + '"].repositories[0..10].name')
        .then((response) => {
          console.log('repositories', response);
          this.repositories = [];
          for (let key in response.json.user[this.login].repositories) {
            this.repositories.push(response.json.user[this.login].repositories[key]);
          }
        });
    }
  }
}
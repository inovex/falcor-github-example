import { Component, OnInit } from '@angular/core';
import { FalcorService } from './service/falcor.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: 'main-app.html',
  providers: [FalcorService]
})
export class AppComponent implements OnInit { 
  private user = {};
  private login;

  constructor(private falcorService: FalcorService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((param: Params) => {
      this.login = param['login'];
      if (!this.login) {
        this.router.navigate(['/'], { queryParams: { 'login': 'KordonDev' } });
      } else {
        this.loadUserForLogin();
      }
    });
  }

  loadUserForLogin() {
    this.falcorService
      .get('user["' + this.login + '"]["stars", "name", "login", "imageUrl"]')
        .then(response => {
          console.log('app', response);
          this.user = response.json.user[this.login];
        });
  }

}


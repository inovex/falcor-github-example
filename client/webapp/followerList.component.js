"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var falcor_service_1 = require('./service/falcor.service');
var router_1 = require('@angular/router');
var FollowerListComponent = (function () {
    function FollowerListComponent(falcorService, router) {
        this.falcorService = falcorService;
        this.router = router;
        this.followers = [];
    }
    ;
    FollowerListComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.login && changes['login'].currentValue !== changes['login'].previousValue) {
            this.falcorService
                .get('user["' + this.login + '"].follower[0..10]["name", "login", "stars"]')
                .then(function (response) {
                _this.followers = [];
                for (var key in response.json.user[_this.login].follower) {
                    _this.followers.push(response.json.user[_this.login].follower[key]);
                }
            });
        }
    };
    FollowerListComponent.prototype.selectUser = function (user) {
        this.router.navigate(['/'], { queryParams: { 'login': user.login } });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FollowerListComponent.prototype, "login", void 0);
    FollowerListComponent = __decorate([
        core_1.Component({
            selector: 'follower-list',
            template: "<h4 class=\"h4\">Follower</h4>\n    <ul class=\"list-group\">\n      <li class=\"list-group-item clickable\" (click)=\"selectUser(follower)\" *ngFor=\"let follower of followers\">{{follower.name}} <span class=\"pull-right\">Stars: {{follower.stars}}</span></li>\n    </ul>"
        }), 
        __metadata('design:paramtypes', [falcor_service_1.FalcorService, router_1.Router])
    ], FollowerListComponent);
    return FollowerListComponent;
}());
exports.FollowerListComponent = FollowerListComponent;
//# sourceMappingURL=followerList.component.js.map
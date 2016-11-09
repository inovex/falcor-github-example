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
var FollowingListComponent = (function () {
    function FollowingListComponent(falcorService, router) {
        this.falcorService = falcorService;
        this.router = router;
        this.followings = [];
    }
    FollowingListComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.login && changes['login'].currentValue !== changes['login'].previousValue) {
            this.falcorService
                .get('user["' + this.login + '"].following[0..10]["name", "login"]')
                .then(function (response) {
                console.log('following', response);
                _this.followings = [];
                for (var key in response.json.user[_this.login].following) {
                    _this.followings.push(response.json.user[_this.login].following[key]);
                }
            });
        }
    };
    FollowingListComponent.prototype.selectUser = function (user) {
        this.router.navigate(['/'], { queryParams: { 'login': user.login } });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FollowingListComponent.prototype, "login", void 0);
    FollowingListComponent = __decorate([
        core_1.Component({
            selector: 'following-list',
            template: "<h4 class=\"h4\">Following</h4>\n    <ul class=\"list-group\">\n      <li class=\"list-group-item clickable\" (click)=\"selectUser(following)\" *ngFor=\"let following of followings\">{{following.name}}</li>\n    </ul>"
        }), 
        __metadata('design:paramtypes', [falcor_service_1.FalcorService, router_1.Router])
    ], FollowingListComponent);
    return FollowingListComponent;
}());
exports.FollowingListComponent = FollowingListComponent;
//# sourceMappingURL=followingList.component.js.map
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
var FollowerListComponent = (function () {
    function FollowerListComponent(falcorService) {
        this.falcorService = falcorService;
        this.followers = [];
    }
    ;
    FollowerListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.falcorService
            .get('user["' + this.login + '"].repositories[0..10].name')
            .then(function (response) {
            _this.followers = [];
            for (var key in response.json.user[_this.login].follower) {
                _this.followers.push(response.json.user[_this.login].follower[key]);
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FollowerListComponent.prototype, "login", void 0);
    FollowerListComponent = __decorate([
        core_1.Component({
            selector: 'follower-list',
            template: "<h4>Follower</h4>\n    <ul>\n      <li *ngFor=\"let follower of followers\">{{follower.name}}</li>\n    </ul>"
        }), 
        __metadata('design:paramtypes', [falcor_service_1.FalcorService])
    ], FollowerListComponent);
    return FollowerListComponent;
}());
exports.FollowerListComponent = FollowerListComponent;
//# sourceMappingURL=follower.component.js.map
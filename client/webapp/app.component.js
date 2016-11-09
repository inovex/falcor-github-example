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
var AppComponent = (function () {
    function AppComponent(falcorService, route, router) {
        this.falcorService = falcorService;
        this.route = route;
        this.router = router;
        this.user = {};
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (param) {
            _this.login = param['login'];
            if (!_this.login) {
                _this.router.navigate(['/'], { queryParams: { 'login': 'KordonDev' } });
            }
            else {
                _this.loadUserForLogin();
            }
        });
    };
    AppComponent.prototype.loadUserForLogin = function () {
        var _this = this;
        this.falcorService
            .get('user["' + this.login + '"]["stars", "name", "login", "imageUrl"]')
            .then(function (response) {
            console.log('app', response);
            _this.user = response.json.user[_this.login];
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'main-app.html',
            providers: [falcor_service_1.FalcorService]
        }), 
        __metadata('design:paramtypes', [falcor_service_1.FalcorService, router_1.ActivatedRoute, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
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
var RepositoryListComponent = (function () {
    function RepositoryListComponent(falcorService) {
        this.falcorService = falcorService;
        this.repositories = [];
    }
    ;
    RepositoryListComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.login && changes['login'].currentValue !== changes['login'].previousValue) {
            this.falcorService
                .get('user["' + this.login + '"].repositories[0..10]["name", "stars"]')
                .then(function (response) {
                console.log('repositories', response);
                _this.repositories = [];
                for (var key in response.json.user[_this.login].repositories) {
                    _this.repositories.push(response.json.user[_this.login].repositories[key]);
                }
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RepositoryListComponent.prototype, "login", void 0);
    RepositoryListComponent = __decorate([
        core_1.Component({
            selector: 'repository-list',
            template: "<h4 class=\"h4\">Repositories</h4>\n    <ul class=\"list-group\">\n      <li class=\"list-group-item\" *ngFor=\"let repository of repositories\">{{repository.name}} <span class=\"pull-right\">Stars: {{repository.stars}}</span></li>\n    </ul>"
        }), 
        __metadata('design:paramtypes', [falcor_service_1.FalcorService])
    ], RepositoryListComponent);
    return RepositoryListComponent;
}());
exports.RepositoryListComponent = RepositoryListComponent;
//# sourceMappingURL=repositoryList.component.js.map
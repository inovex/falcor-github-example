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
//import { HttpDataSource, Model, ModelResponse } from 'falcor';
//import { JSONEnvelope } from '~falcor~falcor-json-graph';
var falcor = require('../../node_modules/falcor/dist/falcor.browser.js');
var FalcorService = (function () {
    function FalcorService() {
        this.falcorModel = new falcor.Model({ source: new falcor.HttpDataSource('http://localhost:3000/model.json') });
    }
    FalcorService.prototype.get = function (selectionPath) {
        return this.falcorModel.get(selectionPath)
            .then(function (response) {
            console.log(selectionPath, response);
            return response;
        });
    };
    FalcorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FalcorService);
    return FalcorService;
}());
exports.FalcorService = FalcorService;
//# sourceMappingURL=falcor.service.js.map
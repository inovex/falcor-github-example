import { Injectable } from '@angular/core';
//import { HttpDataSource, Model, ModelResponse } from 'falcor';
//import { JSONEnvelope } from '~falcor~falcor-json-graph';
var falcor = require('../../node_modules/falcor/dist/falcor.browser.js');

@Injectable()
export class FalcorService {
    private options: any = {
        withCredentials: false,
        crossDomain: true
    };
    private falcorModel = new falcor.Model({source: new falcor.HttpDataSource('http://localhost:3000/model.json', this.options) });

    get(selectionPath: string): any {
        return this.falcorModel.get(selectionPath)
            .then(response => {
                console.log(selectionPath, response);
                return response;
            });
    }
}

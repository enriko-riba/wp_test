import { Component } from "./decorators";
import {vm} from "../main";

/**
 * VM for route not found page.
 * Just exposes the notFoundRoute string.
 */
@Component({
    name: 'route-not-found',
    template: require('./route-not-found.html')
  })
export class Route404 {
    private notFoundRouteName = ko.observable("");
    constructor() {
        var router = vm.router();
        this.notFoundRouteName(router.ActiveRoute().params['route']);
    }
}


import * as ko from "knockout";
import {Component} from "./decorators";

@Component({
    name:'sidebarComponent',
    template: require('./sidebar.html')
})
export class Sidebar {
  private myText = ko.observable("Hello from my new component!");
}
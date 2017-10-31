
import {Component} from "./decorators";

@Component({
    name:'sidebar',
    template: require('./sidebar.html')
})
export class Sidebar {
  private myText = ko.observable("Hello from my new component!");
}
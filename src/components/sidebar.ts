import { Component } from "./decorators";
import { vm } from "../main";

@Component({
  name: 'sidebar',
  template: require('./sidebar.html')
})
export class Sidebar {
  private items: Array<MenuItem>;

  constructor() {
    this.items = [
      new MenuItem('/home', 'Home', true),
      new MenuItem('/about', 'About'),
      new MenuItem('/usage', 'Usage'),
      new MenuItem('/search', 'Module finder'),
      new MenuItem('/events', 'Events'),
      new MenuItem('/services', 'Services'),
      new MenuItem('/contact', 'Contact'),
    ];
  }
}

class MenuItem {

  constructor(href: string, text: string, isActive: boolean = false) {
    this.isActive(isActive);
    this.href = href;
    this.text = text;
  }

  public isActive = ko.observable(false);
  public href = "";
  public text = "";
}
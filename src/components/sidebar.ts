import { Component } from "./decorators";
import { vm } from "../main";
import {LinkItem} from "../LinkItem";
import {links} from "../links";

@Component({
  name: 'sidebar',
  template: require('./sidebar.html')
})
export class Sidebar {
  private items: Array<LinkItem>;

  constructor() {
    //  return only items with addToMenu flag = true
    this.items = ko.utils.arrayFilter(links,(item)=> item.addToMenu===true);
  }
}
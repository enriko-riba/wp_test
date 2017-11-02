import {Component} from "./decorators";

@Component({
    name:'page-home',
    template: require('./page-home.html')
})
export class Home {
 
    constructor(){
        $(".sidebar-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    }
}
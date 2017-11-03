require('./register-components');

import {Test} from "./test";
import {Router, Route, Application} from "./SpaApplication";
import {links} from "./links";

class Main extends Application{
    constructor(){
        super();
        
        links.forEach((li)=> {
            this.router().AddRoute( new Route(li.href, li.component));
        }) ;   
        this.router().SetNotFoundRoute(new Route('/#/notfound', 'route-not-found'));
        this.IsDebugToConsoleEnabled(true);
        this.router().Run();   
        
        $(".sidebar-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    }   
    
    // public async tester(){
    //     var t_module = await import('./test');
    //     var st : Test = new t_module.Test();
    //     st.sayTest();
    // }
}
export var vm = new Main();

$(document).ready( ()=> {
    ko.applyBindings(vm);
});

//$('body').on('click', async ()=> vm.tester());

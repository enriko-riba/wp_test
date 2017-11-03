require('./register-components');

import { Test } from "./test";
import { Router, Route, Application } from "./SpaApplication";
import { links } from "./links";

class Main extends Application {
    constructor() {
        super();

        this.IsDebugToConsoleEnabled(true);
        
        //  sidebar toggle on click
        $(".sidebar-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });

        this.initRouting();
    }

    private initRouting() {
        //  create routes from links
        var r = this.router();

        links.forEach((li) => {
            r.AddRoute(new Route(li.href, li.component));
        });
        r.SetNotFoundRoute(new Route('/#/notfound', 'route-not-found'));

        //  TODO: refactor this...html is bound to links so we must update the isActive on route change
        var cb = () => {
            links.forEach(element => {
                element.isActive(element.href == r.ActiveRoute().href);
            });
        };
        ko.postbox.subscribe("route:afternavigate", cb, this);

        r.Run(links[0].href);
    }

    // public async tester(){
    //     var t_module = await import('./test');
    //     var st : Test = new t_module.Test();
    //     st.sayTest();
    // }
}
export var vm = new Main();

$(document).ready(() => {
    ko.applyBindings(vm);
});

//$('body').on('click', async ()=> vm.tester());

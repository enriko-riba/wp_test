require('./RegisterComponents');

import {Test} from "./test";
import {Router, RouteConfig} from "yester";
import {links} from "./links";

class Main{
    public currentPage = ko.observable("page-home");

    private router: Router;
    constructor(){
        
        var routeCfg  = links.map((li)=> { 
            return { 
                $: li.href ,
                enter: ()=> {
                    this.currentPage(li.component);
                }
            }; 
        });        
        this.router = new Router(routeCfg, {type: "browser"});
        this.router.init();
        //this.router.navigate(links[0].href);
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

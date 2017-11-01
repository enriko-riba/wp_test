require('./registerComponents');
import {Test} from "./test";

class Main{
    public currentPage = ko.observable("page-home");

    constructor(){
    }   
    
    public async tester(){
        var t_module = await import('./test');
        var st : Test = new t_module.Test();
        st.sayTest();
    }
}
export var vm = new Main();

$(document).ready( ()=> {
    ko.applyBindings(vm);
});

$('body').on('click', async ()=> vm.tester());

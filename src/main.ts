require('./registerComponents');

class Main{
    private currentPage = ko.observable("page-home");

    constructor(){
    }   
    public async tester(){
        var t_module : any = await import('./test');
        var st = new t_module.Test();
        st.sayTest();
    }
}
export var vm = new Main();

$(document).ready( ()=> {
    ko.applyBindings(vm);
});

$('body').on('click', async ()=> vm.tester());

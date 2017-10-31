require('./registerComponents');

class Main{
    private currentPage = ko.observable("page-home");

    constructor(){
    }   
}
export var vm = new Main();

$(document).ready( ()=> {
    ko.applyBindings(vm);
});
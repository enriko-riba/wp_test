import * as $ from "jquery";

export class Greeter {
    public greet(person: string) {
        var css = require("./ole1.scss"); 
        $('<div>' + 'Hola, ' + person + '</div>').appendTo($('body'));
        return "Hola, " + person;
    }
}
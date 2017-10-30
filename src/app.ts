import * as $ from "jquery";
 
export class Greeter {
    public greet(person: string) {
        $('<div>' + 'Hola, ' + person + '</div>').appendTo($('body'));
        return "Hola, " + person;
    }
}
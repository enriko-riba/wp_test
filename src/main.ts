import * as $ from "jquery";
import {Greeter} from "./app";

class Main{
    constructor(){ 
        //  setup button binding
        $("#btnGreet").on('click', ()=>{
            this.btnGreetClick();
        });
        var img = require('./assets/imperator.jpg');
        $('<img />', {src: img}).appendTo($('body'));
    }

    private btnGreetClick(){ 
        var css = require("./ole2.scss");
        var test = new Greeter().greet('Senorita');
        console.log(test);
    }
}

$(document).ready( ()=> {
    var main = new Main();    
});
import * as $ from "jquery";
import "bootstrap";


import "./site.scss";
import {Greeter} from "./app"; 

class Main{
    constructor(){ 

        //  setup button binding
        $("#btnGreet").on('click', ()=>{
            this.btnGreetClick();
        });

        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    }

    private btnGreetClick(){ 
        
        var test = new Greeter().greet('Senorita');
        console.log(test);
    }
}

$(document).ready( ()=> {
    var main = new Main();    
});
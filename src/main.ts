import "bootstrap";
import * as $ from "jquery";
import * as ko from "knockout";

import "./site.scss";
import {Greeter} from "./app";
import {Sidebar} from "./components/sidebar";



class Main{
    constructor(){
        //  setup button binding
        $("#btnGreet").on('click', ()=>{
            this.btnGreetClick();
        });

        $(".sidebar-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    }

    private btnGreetClick(){         
        var test = new Greeter().greet('Senorita');
        console.log(test);
    }
    private sb = new Sidebar();
}

$(document).ready( ()=> {
    var main = new Main();
    ko.applyBindings(main);
});
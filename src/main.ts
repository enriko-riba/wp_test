require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');
require('./css/site.scss');

require('./register-components');

import { Test } from "./test";
import { Router, Route, Application } from "./SpaApplication";
import { links } from "./links";

import * as firebase from "firebase/app";


class Main extends Application {
    public firebaseApp: firebase.app.App;

    constructor() {
        super();

        this.IsDebugToConsoleEnabled(true);
        
        //  sidebar toggle on click
        $(".sidebar-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });

        this.initRouting();
        this.initFirebase();

        var constraints = {
            audio: false,
            video: true
          };
          navigator.mediaDevices
                    .getUserMedia(constraints)
                    .then(this.handleSuccess)
                    .catch(this.handleError);
        var snapshotButton : HTMLElement = document.querySelector('button#snapshot');
        snapshotButton.onclick = this.snapshotClick.bind(this);
    }
    private canvas = document.querySelector('canvas');
    private video = document.querySelector('video');
    private handleSuccess = (stream:any) => {
        this.video.srcObject = stream;
    }      
    private handleError = (error:any)=> {
        console.log('navigator.getUserMedia error: ', error);
    }
    private snapshotClick = ()=> {
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
      };


    private initFirebase(){
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAD5a1gYD8SLg1JTAqm96VjKfSYZg8UHkM",
            authDomain: "imperator-module.firebaseapp.com",
            databaseURL: "https://imperator-module.firebaseio.com",
            projectId: "imperator-module",
            storageBucket: "",
            messagingSenderId: "1072452398425"
          };
        this.firebaseApp = firebase.initializeApp(config);
        console.log('firebase app:', this.firebaseApp.name);

        var db = firebase.firestore(this.firebaseApp);
        // db.collection("users").add({
        //     first: "Ada",
        //     last: "Lovelace",
        //     born: 1815
        // })
        // .then(function(docRef) {
        //     console.log("Document written with ID: ", docRef.id);
        // })
        // .catch(function(error) {
        //     console.error("Error adding document: ", error);
        // });

        //  query data
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${ko.toJSON(doc.data())}`);
            });
        });
    }

    /**
     * Creates application routes and starts the router 
     */
    private initRouting() {
        
        var r = this.router();
        links.forEach((li) => {
            r.AddRoute(new Route(li.href, li.component));
        });
        r.SetNotFoundRoute(new Route('/#/notfound', 'route-not-found'));

        //  TODO: refactor this...
        ko.postbox.subscribe("route:afternavigate", this.afterRouteNavigate, this);
        r.Run(links[0].href);
    }

    /**
     * Updates the links.isActive observable
     */
    private afterRouteNavigate = () => {
        var r = this.router();
        links.forEach(element => {
            element.isActive(element.href == r.ActiveRoute().href);
        });
    };

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

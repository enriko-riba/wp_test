import { Component } from "./decorators";
import * as firebase from "firebase/app";

@Component({
    name: 'page-signin',
    template: require('./page-signin.html')
})
export class SignIn {
    constructor() {
        this.trackAuth();
        this.signIn();
    }

    private async signIn() {
        // Initialize the FirebaseUI Widget using Firebase.
        // The start method will wait until the DOM is loaded.
        var firebaseui = await import ("firebaseui");
        var ui = firebaseui.auth.AuthUI.getInstance();
        if(!ui){
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
         var uiConfig :any = {
            signInSuccessUrl: '/#/admin',
            signInFlow: 'redirect',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            tosUrl: '/#/about' // TODO implement Terms of service url
        };
        ui.start('#firebaseui-auth-container', uiConfig);
    }


    private trackAuth() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var uid = user.uid;
                var phoneNumber = user.phoneNumber;
                var providerData = user.providerData;

                user.getIdToken().then((accessToken) => {
                    console.log('signed in:', JSON.stringify({
                        displayName: displayName,
                        email: email,
                        emailVerified: emailVerified,
                        phoneNumber: phoneNumber,
                        photoURL: photoURL,
                        uid: uid,
                        accessToken: accessToken,
                        providerData: providerData
                    }, null, '  '));
                });
            } else {
                // User is signed out.
                console.log('signed out');
            }
        }, function (error) {
            console.log(error);
        });
    };
}
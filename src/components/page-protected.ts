import { Component } from "./decorators";
import * as firebase from "firebase/app";

@Component({
  name: 'page-protected',
  template: require('./page-protected.html')
})
export class Protected {
  constructor(){

    //  check user and bail out if none
    var user = firebase.auth().currentUser;
    console.log('current user:', ko.toJSON(user, null, ' '));

    if(!user){
      window.location.href = "/#/signin";
    }
  }
}
import { Injectable } from '@angular/core';

import firebase from '../environments/firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authState: boolean = false;

  constructor() {

    firebase.auth().onAuthStateChanged(user => {
      this._authState = user ? true : false;
      console.log(this._authState);
    })

  }

  // méthode d'authentification
  auth(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
}

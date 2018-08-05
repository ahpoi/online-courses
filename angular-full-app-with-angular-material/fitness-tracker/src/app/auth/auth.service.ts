import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService {

  authChange = new Subject<boolean>();

  private user: User | null;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(JSON.stringify(result));
      this.authSucessfully();
    }).catch(error => {
      console.log(error)
    })
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(JSON.stringify(result));
      this.authSucessfully();
    }).catch(error => {
      console.log(error)
    });
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login'])
  }

  isAuth() {
    return this.user != null;
  }

  getUser() {
    return {...this.user};
  }

  private authSucessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training'])
  }
}

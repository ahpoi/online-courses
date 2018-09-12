import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromRoot.State>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(fromRoot.getIsAuth);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    //Observable is an ongoing construct, keeps emitting values, but the guard only runs once
    //Finish after getting value, closes the subscription
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

}

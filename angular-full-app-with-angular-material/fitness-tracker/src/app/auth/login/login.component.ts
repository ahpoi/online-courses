import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading$: Observable<boolean>; //Convention to use $ with variable with ngRx

  // private loadingSubs: Subscription;

  constructor(private authService: AuthService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.subscribe(data => console.log(data));
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading
    // });
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {validators: [Validators.required]})
    });
  }

  onSubmit() {
    const data: AuthData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.authService.login(data);
  }
  
}

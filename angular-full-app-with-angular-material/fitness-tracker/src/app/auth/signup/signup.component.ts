import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { UIService } from '../../shared/ui.service';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate;

  isLoading: boolean = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService) {
  }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    const data: AuthData = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.registerUser(data);
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}

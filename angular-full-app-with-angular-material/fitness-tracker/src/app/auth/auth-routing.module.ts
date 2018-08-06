import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
];

//Call for child to merge it to the main router behind the scenes
@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class AuthRoutingModule {
}

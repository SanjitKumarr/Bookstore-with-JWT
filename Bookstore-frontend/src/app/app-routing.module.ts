import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserRegisterPageComponent } from './components/user-register-page/user-register-page.component';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full' },
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: UserRegisterPageComponent},
  {path: 'user-page', component: UserPageComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: UserCartComponent, canActivate: [AuthGuard]},
  { 
    path: '**', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

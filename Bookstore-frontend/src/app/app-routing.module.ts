import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full' },
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: UserRegisterPageComponent},
  {path: 'user-page', component: UserPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

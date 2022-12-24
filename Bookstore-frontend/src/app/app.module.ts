import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { UserRegisterPageComponent } from './components/user-register-page/user-register-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserRegisterPageComponent,
    UserPageComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

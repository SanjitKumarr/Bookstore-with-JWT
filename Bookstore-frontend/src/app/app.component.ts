import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from './services/user-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Bookstore-frontend';
  isLoggedIn = false;
  constructor(private userAuthenticationService:UserAuthenticationService){
  }
  ngOnInit():void {
    this.userAuthenticationService.isUserAuthenticated.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  signOut(){
    this.isLoggedIn = false;
    this.userAuthenticationService.isUserAuthenticated.next(false);
  }

}

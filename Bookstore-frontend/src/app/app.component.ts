import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookCrudService } from './services/book-crud.service';
import { CartService } from './services/cart.service';
import { UserAuthenticationService } from './services/user-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Bookstore-frontend';
  isLoggedIn = false;
  constructor(private userAuthenticationService:UserAuthenticationService,
    private cartService:CartService,private bookCrudService:BookCrudService,
    private router:Router, private ngZone:NgZone,){
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

  async getUserCart(){
    let reqBodyData = {
      userId: this.userAuthenticationService.currentUserId
    }
    await this.cartService.getCart(reqBodyData).subscribe((data) => {
      console.log(data);
      if(data && data.length > 0 && data[0].userCart){
        this.bookCrudService.currentUserCart = data[0].userCart;
      }else {
        this.bookCrudService.currentUserCart = [];
      }
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/cart');
      })
    })
  }

}

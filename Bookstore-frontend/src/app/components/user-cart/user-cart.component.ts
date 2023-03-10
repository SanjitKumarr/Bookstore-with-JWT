import { Component, OnInit } from '@angular/core';
import { BookCrudService } from 'src/app/services/book-crud.service';
import { CartService } from 'src/app/services/cart.service';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {
  cartBookDetail:any = [];

  constructor(private bookCrudService:BookCrudService,private cartService:CartService,
    private userAuthenticationService:UserAuthenticationService) { }

  ngOnInit(): void {
    console.log(this.bookCrudService.currentUserCart);
    this.bookCrudService.currentlyAvailableBook.forEach((e1:any)=>this.bookCrudService.currentUserCart.forEach((e2:any)=>{
      if(e1._id === e2.bookId){ this.cartBookDetail.push(e1)}}));
      console.log(this.cartBookDetail);
  }
  async clearCart() {
    let apiData = {
      userId: this.userAuthenticationService.currentUserId
    }
    await this.cartService.clearUserCart(apiData).subscribe((data)=>{
      this.cartBookDetail = [];
      this.bookCrudService.currentUserCart = [];
      console.log(data);
    })
  }

}

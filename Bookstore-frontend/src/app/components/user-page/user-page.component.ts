import { Component, OnInit } from '@angular/core';
import { BookCrudService } from 'src/app/services/book-crud.service';
import { CartService } from 'src/app/services/cart.service';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  Books:any=[];
  searchValue:string = '';

  constructor(private bookCrudService: BookCrudService, private userAuthenticationService: UserAuthenticationService,
    private cartService: CartService) { }
  
  ngOnInit(): void {
    this.bookCrudService.getBooks().subscribe(res => {
      console.log(res);
      this.Books=res;
      this.bookCrudService.currentlyAvailableBook = res;
    });
  }

  addToCart(event:any):void {
    let data = {
      userId : this.userAuthenticationService.currentUserId,
      bookId : event._id
    };
    this.cartService.addInCart(data).subscribe(res => {
      console.log(res);
    });
    console.log(event);
  }
}

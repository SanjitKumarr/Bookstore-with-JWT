import { Component, OnInit } from '@angular/core';
import { BookCrudService } from 'src/app/services/book-crud.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  Books:any=[];
  searchValue:string = '';

  constructor(private bookCrudService: BookCrudService) { }
  
  ngOnInit(): void {
    this.bookCrudService.getBooks().subscribe(res => {
      console.log(res);
      this.Books=res;
    });
  }

}

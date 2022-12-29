import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../interfaces/book';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(filteredBook:Book[],searchValue:string): Book[] {
    if(!filteredBook || !searchValue) {
      return filteredBook;
    }
    return filteredBook.filter(book=>book.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    ||book.author.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase() ));
  }

}
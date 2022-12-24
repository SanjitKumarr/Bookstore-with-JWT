import { TestBed } from '@angular/core/testing';

import { BookCrudService } from './book-crud.service';

describe('BookCrudService', () => {
  let service: BookCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

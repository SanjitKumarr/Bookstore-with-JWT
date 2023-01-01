import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  api:string = 'http://localhost:5000/api';
  httpHeaders:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient:HttpClient) { }

  addInCart(data:any):Observable<any> {
    let url=`${this.api}/addToCart`;
    return this.httpClient.post(url, data);
  }

  getCart(data:any):Observable<any> {
    let url=`${this.api}/getUserCart`;
    return this.httpClient.post(url, data);
  }

  clearUserCart(data:any):Observable<any> {
    let url=`${this.api}/clearUserCart`;
    let option = {
      body : data
    }
    return this.httpClient.delete(url,option);
  }

}

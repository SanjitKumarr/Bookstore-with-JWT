import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  api = 'http://localhost:5000/api';
  isUserAuthenticated = new BehaviorSubject(false);
  accessToken = new BehaviorSubject('');

  constructor(private httpClient:HttpClient) { }
  
  login(data:any):Observable<any> {
    let url=`${this.api}/login`;
    return this.httpClient.post(url, data);
  }

  register(data:any):Observable<any> {
    let url=`${this.api}/register`;
    return this.httpClient.post(url, data);
  }

  setAccessToken(data:any){
    this.accessToken.next(data);
  }

  getAccessToken(){
    this.accessToken.subscribe((data)=>{
      return data;
    })
  }
}

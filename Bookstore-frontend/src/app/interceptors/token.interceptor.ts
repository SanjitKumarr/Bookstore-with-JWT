import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthenticationService } from '../services/user-authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userAuthenticationService: UserAuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let accessToken = '';
    this.userAuthenticationService.accessToken.subscribe((token: string) => {
      accessToken = token;
    })
    const authReq = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
      .set('access-token', accessToken)
    });

    console.log('Intercepted HTTP call', authReq);

    return next.handle(authReq);
  }
}

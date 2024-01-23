import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // debugger;
    const token = sessionStorage.getItem('token');
    const bearerToken = `Bearer ${token}`;
    const authReq = req.clone({
      headers: req.headers.set('Authorization', bearerToken),
    });
    return next.handle(authReq);
  }
}

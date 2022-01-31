import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthentificationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ( localStorage.getItem('token')){

      const nr = request.clone({
        setHeaders: {
          "authorization": localStorage.getItem('token')!
        }
      });
      return next.handle(nr);
    }else{
      return next.handle(request) ;
    }
  }
}

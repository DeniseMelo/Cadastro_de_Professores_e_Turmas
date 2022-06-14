import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/autentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem('token');

    if(token == null) {
      token = ''
    }

    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

    return next.handle(req)
    .pipe(
      catchError(error =>{
        if(error instanceof HttpErrorResponse){
          if(error.status == 403) {
            console.log(error)
            console.error(error)
/*             this.authService.logout() */
            this.router.navigateByUrl('/')
          }
        }
        return of(error)
      })
    )
  }
}
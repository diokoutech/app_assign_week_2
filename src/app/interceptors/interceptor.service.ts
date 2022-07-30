import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AuthserviceService } from '../services/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor  {

  constructor(public authService: AuthserviceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  this.authService.isLoading.next(true);
  console.log('in interceptor !');
  return next.handle(req).pipe(
    finalize(
      ()=>{
        this.authService.isLoading.next(false);
      }
    )
  )

  }
}

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AffectationService } from '../services/affectation.service';
import { Authservice } from '../services/authservice';
import { ClasseService } from '../services/classe.service';
import { EleveService } from '../services/eleve.service';
@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    public authService: Authservice,
    public eleveService: EleveService,
    public classeService: ClasseService,
    public affectationService:AffectationService,
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.authService.isLoading.next(true);
    this.eleveService.isLoading.next(true);
    this.classeService.isLoading.next(true);
    this.affectationService.isLoading.next(true);
    console.log('in interceptor !');
    return next.handle(req).pipe(
      finalize(() => {
        this.authService.isLoading.next(false);
        this.eleveService.isLoading.next(false);
        this.classeService.isLoading.next(false);
        this.affectationService.isLoading.next(false);
      })
    );
  }
}

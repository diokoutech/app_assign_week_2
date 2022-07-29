import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogin = localStorage.getItem('isLogin');
    if(isLogin === 'true'){
      return true;
    }else{
      this.router.navigate([''])
      Swal.fire({
        text: "Essayer de vous connecter !",
        icon: "error",
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true
      });
      return false;
    }
  }

}

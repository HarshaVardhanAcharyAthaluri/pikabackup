import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {User} from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUser: User;
  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe(data => {
     this.currentUser = data;
    });
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.currentUser) {
     for(let i=0;i<this.currentUser.roles.length;i++){
      if(route.data.roles && route.data.roles.indexOf(this.currentUser.roles[i]) !== -1){
        return true;
      }
      this.router.navigate(['/401']);
      return false;
     }
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}

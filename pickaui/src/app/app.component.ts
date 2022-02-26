import { ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav/sidenav';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { windowWhen } from 'rxjs/operators';
import { Role } from './models/role';
import { User } from './models/user';
import { TokenStorageService } from './services/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pikaportalapp';
  showFiller:boolean;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  redirectTo:string;
  isExpanded= true;
  @ViewChild('drawer') drawer: MatSidenav;
  isMobile= true;

  constructor(private tokenStorageService: TokenStorageService,private router:Router) { 
    this.router.events.subscribe(event => {
      // close sidenav on routing
      if(event instanceof NavigationStart &&  this.isMobile && this.isLoggedIn) {
        this.drawer.close();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
onResize(event) {
  if(event.target.innerWidth > 767) {
    this.isMobile = false;
  }else {
    this.isMobile = true;
  }
}

  ngOnInit() {
    if(window.innerWidth > 767) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
    }
    this.redirectTo = window.location.pathname
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (!this.isLoggedIn) {
      this.router.navigate([this.redirectTo]);
      if(this.redirectTo === '/'){
          this.router.navigate(['/login'])
      }
    }else{
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.name;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  
}

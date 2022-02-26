import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    user:any;

    constructor(private tokenStorageService: TokenStorageService) {
   }

   ngOnInit(){
     this.user = this.tokenStorageService.getUser();
   }

   logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

 
}

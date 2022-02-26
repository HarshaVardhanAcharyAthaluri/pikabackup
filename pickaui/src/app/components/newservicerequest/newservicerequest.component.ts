import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-newservicerequest',
  templateUrl: './newservicerequest.component.html',
  styleUrls: ['./newservicerequest.component.scss']
})
export class NewServiceRequestComponent implements OnInit {

  isLoggedIn = false;
  showspinner = false;
  error:string;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }


}

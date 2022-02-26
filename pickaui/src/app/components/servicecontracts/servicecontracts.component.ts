import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ServiceContractDetails } from 'src/app/models/servicecontractdetails';
import { C4ccustomerdetailsService } from 'src/app/services/c4ccustomerdetails.service';
import { ContactService } from 'src/app/services/contact.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-servicecontracts',
  templateUrl: './servicecontracts.component.html',
  styleUrls: ['./servicecontracts.component.scss']
})
export class ServicecontractsComponent implements OnInit {

  isLoggedIn;
  contact:Contact = new Contact();
  c4ccustomerId:string;
  serviceContractList:Array<any>;
  showspinner:boolean = false;
  error:string;
  constructor(
    private c4ccustomerservice:C4ccustomerdetailsService,
    private tokenStorage: TokenStorageService,
    private contactservice:ContactService
    ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.contactservice.getContactById(this.tokenStorage.getUser().id).subscribe(contactdetails =>{
        this.contact = contactdetails;
        this.getallservicecontracts(this.contact.refCustomeId.customerId);
      });
    }
  }

  getallservicecontracts(buyerPartyId){
    this.showspinner = true;
    this.c4ccustomerservice.getAllServiceContracts(buyerPartyId).subscribe(contracts=>{
      this.serviceContractList = contracts.d.results;
      if(contracts.d.results[0] === undefined){
            this.error = 'CustomerId not found';
      }
        this.showspinner = false;
    },err=>{
      this.showspinner = false;
    });

  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { c4cCustomerDetails } from 'src/app/models/c4cCustomerDetails';
import { C4ccustomerdetailsService } from 'src/app/services/c4ccustomerdetails.service';

@Component({
  selector: 'app-c4ccustomerdetails',
  templateUrl: './c4ccustomerdetails.component.html',
  styleUrls: ['./c4ccustomerdetails.component.scss']
})
export class C4ccustomerdetailsComponent implements OnInit {

  c4ccustomer:c4cCustomerDetails = new c4cCustomerDetails();

  c4ccustomerId:string;

  showspinner:boolean = false;

  error:string;

  constructor(
    private c4ccustomerservice:C4ccustomerdetailsService,
    private route:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.c4ccustomerId = params.get('id');
        this.getc4cCustomer(this.c4ccustomerId);
      }
    });
  }

  getc4cCustomer(accountId:string){
    this.showspinner = true;
    this.c4ccustomerservice.getc4cCustomerDetails(accountId).subscribe(customer=>{
      this.c4ccustomer = customer.d.results[0];
      if(customer.d.results[0] === undefined){
            this.error = 'CustomerId not found';
      }
        this.showspinner = false;
    },err=>{
      this.showspinner = false;
    });

  }

}

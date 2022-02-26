import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/customer/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { 
      
  }

  getAllCustomers(): Observable<any> {
    return this.http.get(API_URL + 'all');
  }

  getCustomerById(customerId):Observable<any>{
    return this.http.get(API_URL+customerId);
}

updateCustomer(customerId:number,cutomer:any):Observable<any>{
  return this.http.put(API_URL+customerId,{
    name: cutomer.name,
    email: cutomer.description,
    customerId:cutomer.customerId
  }, httpOptions);

}


deleteCustomer(customerId:number):Observable<any>{
  return this.http.delete(API_URL+customerId, { responseType: 'text' });
}

  register(customer): Observable<any> {
    return this.http.post(API_URL, {
      name: customer.name,
      description: customer.description,
      customerId:customer.customerId
    }, httpOptions);
  }
}

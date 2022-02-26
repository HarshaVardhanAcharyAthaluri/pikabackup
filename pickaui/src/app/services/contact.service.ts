import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/contact/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { 
      
  }

  getAllContacts(): Observable<any> {
    return this.http.get(API_URL + 'all');
  }

  getContactById(contactId):Observable<any>{
      return this.http.get(API_URL+contactId);
  }

  updateContact(contactId:number,contact:any):Observable<any>{
    return this.http.put(API_URL+contactId,{
      name: contact.name,
      email: contact.email,
      password: contact.password,
      refCustomeId:contact.refCustomeId,
      contactId:contact.contactId
    }, httpOptions);

  }

  
  deleteContact(contactId:number):Observable<any>{
    return this.http.delete(API_URL+contactId, { responseType: 'text' });
  }

  
}

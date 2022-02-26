import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import {map} from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User> (JSON.parse(sessionStorage.getItem('auth-user')));
      this.currentUser = this.currentUserSubject.asObservable();
      
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

   adminlogin(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'contact/signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(contact): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      name: contact.name,
      email: contact.email,
      password: contact.password,
      refCustomeId:contact.refCustomeId
    }, httpOptions);
  }

  contactRegister(contact): Observable<any> {
    return this.http.post(AUTH_API + 'contact/signup', {
      name: contact.name,
      email: contact.email,
      password: contact.password,
      refCustomeId:contact.refCustomeId,
      contactId:contact.contactId
    }, httpOptions);
  }
}

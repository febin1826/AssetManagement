import { Injectable } from '@angular/core';
import { Login } from './login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:59259/api';
  constructor(private http: HttpClient) { }
  public Login(userInfo: Login): Observable<any> {

    return this.http.get(this.baseUrl+ '/logintbls?username='+userInfo.uname+'&password='+userInfo.pass);
  }
  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}



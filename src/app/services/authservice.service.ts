import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private url = "http://localhost:4000/auth/login";
  private url_register = "http://localhost:4000/auth/register";

  constructor(private clientHttp: HttpClient) { }

  login(item:any){
    return this.clientHttp.post<any>(this.url,item);
  }
  register(item:any){
    return this.clientHttp.post<any>(this.url_register,item);
  }
}

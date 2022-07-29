import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private url = environment.api_url + "auth/login";
  private url_register = environment.api_url +"auth/register";

  constructor(private clientHttp: HttpClient) { }

  login(item:any){
    return this.clientHttp.post<any>(this.url,item);
  }
  register(item:any){
    return this.clientHttp.post<any>(this.url_register,item);
  }
}

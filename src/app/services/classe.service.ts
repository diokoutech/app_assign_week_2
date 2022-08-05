import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Classe } from '../classe';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private myToken: string = localStorage.getItem('token') ?? '';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Authorization" : "Bearer "+this.myToken
    })
  }
  private url= environment.api_url + "classes/";
  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private clientHttp: HttpClient) { }
  // get all eleves
  getAll(){
    return this.clientHttp.get<Classe>(this.url,this.httpOptions);
  }
  deleteOne(id:string)
  {
    return this.clientHttp.delete<any>(this.url+id,this.httpOptions);
  }
  insertOne(item:Classe){
    console.log('save data !');
    return this.clientHttp.post(this.url,{
      code : item.code,
      nomination : item.nomination,
    },this.httpOptions);
  }
  updateOne(id:string,item:Classe){
    console.log('update');
    return this.clientHttp.put(this.url + id,{
      code : item.code,
      nomination : item.nomination,
    },this.httpOptions)
  }
}

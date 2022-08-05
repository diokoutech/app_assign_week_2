import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Affectation } from '../affectation';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AffectationService {
  private myToken: string = localStorage.getItem('token') ?? '';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Authorization" : "Bearer "+this.myToken
    })
  }
  private url = environment.api_url + "affectations/";
  public isLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private clientHttp:HttpClient) { }
  findAll(){
    return this.clientHttp.get<Affectation>(this.url,this.httpOptions);
  }
  deleteOne(id:string){
    return this.clientHttp.delete(this.url + id,this.httpOptions);
  }
  insertOne(affectation:Affectation) {
    return this.clientHttp.post<Affectation>(this.url,{
      "eleve" :affectation.eleve,
      "classe" :affectation.classe,
    },this.httpOptions);
  }
  updateOne(id:string,affectation:Affectation){
    return this.clientHttp.put(this.url + id,{
      "eleve" :affectation.eleve,
      "classe" :affectation.classe,
    },this.httpOptions);
  }
}

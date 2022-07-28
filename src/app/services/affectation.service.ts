import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Affectation } from '../affectation';
@Injectable({
  providedIn: 'root'
})
export class AffectationService {
  private url ="http://localhost:4000/affectations/";
  constructor(private clientHttp:HttpClient) { }
  findAll(){
    return this.clientHttp.get<Affectation>(this.url);
  }
  deleteOne(id:string){
    return this.clientHttp.delete(this.url + id);
  }
  insertOne(affectation:Affectation) {
    return this.clientHttp.post<Affectation>(this.url,{
      "eleve" :affectation.eleve,
      "classe" :affectation.classe,
    });
  }
  updateOne(id:string,affectation:Affectation){
    return this.clientHttp.put(this.url + id,{
      "eleve" :affectation.eleve,
      "classe" :affectation.classe,
    });
  }
}

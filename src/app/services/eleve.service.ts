import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../student';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EleveService {

  private url: string = environment.api_url + "eleves/";
  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private myToken: string = localStorage.getItem('token') ?? 'test';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Authorization" : "Bearer "+this.myToken
    })
  }
  constructor(private clientHttp: HttpClient) { }
  // get all eleves
  getAll(){
    console.log({token : this.myToken});
    return this.clientHttp.get<Student>(this.url,this.httpOptions);
  }
  deleteOne(id:string)
  {
    console.log(id);
    return this.clientHttp.delete<any>(this.url+id,this.httpOptions);
  }
  insertOne(item:Student){
    console.log('save data !');
    return this.clientHttp.post(this.url,{
      nom : item.nom,
      prenom : item.prenom,
      matricule : item.matricule,
      date_naiss : item.date_naiss,
    },this.httpOptions);
  }
  updateOne(id:string,item:Student){
    console.log('update');
    return this.clientHttp.put(this.url + id,{
      nom : item.nom,
      prenom : item.prenom,
      matricule : item.matricule,
      date_naiss : item.date_naiss,
    },this.httpOptions)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../student';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EleveService {

  private url: string = environment.api_url + "eleves/";
  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private clientHttp: HttpClient) { }
  // get all eleves
  getAll(){
    return this.clientHttp.get<Student>(this.url);
  }
  deleteOne(id:string)
  {
    console.log(id);
    return this.clientHttp.delete<any>(this.url+id);
  }
  insertOne(item:Student){
    console.log('save data !');
    return this.clientHttp.post(this.url,{
      nom : item.nom,
      prenom : item.prenom,
      matricule : item.matricule,
      date_naiss : item.date_naiss,
    });
  }
  updateOne(id:string,item:Student){
    console.log('update');
    return this.clientHttp.put(this.url + id,{
      nom : item.nom,
      prenom : item.prenom,
      matricule : item.matricule,
      date_naiss : item.date_naiss,
    })
  }
}

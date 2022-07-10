import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Classe } from '../classe';
@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  private url="http://localhost:4000/classes/";
  constructor(private clientHttp: HttpClient) { }
  // get all eleves 
  getAll(){
    return this.clientHttp.get<Classe>(this.url);
  }
  deleteOne(id:string)
  {
    return this.clientHttp.delete<any>(this.url+id);
  }
  insertOne(item:Classe){
    console.log('save data !');
    return this.clientHttp.post(this.url,{
      code : item.code,
      nomination : item.nomination,
    });
  }
  updateOne(id:string,item:Classe){
    console.log('update');
    return this.clientHttp.put(this.url + id,{
      code : item.code,
      nomination : item.nomination,
    })
  }
}
